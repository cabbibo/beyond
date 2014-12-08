const float size = @SIZE;
const float PI = 3.14159;

uniform vec2 resolution;

uniform sampler2D t_pos;
uniform sampler2D t_oPos;
uniform sampler2D t_og;

uniform float time;
uniform sampler2D t_audio;

varying vec2 vUv;

$simplex
$canUse

// data.x = level
// data.y = temperature
// data.z = isCrystal

void main(){

  float iSize = 1. / size;

  vec2 uv = gl_FragCoord.xy / resolution ;
  vec4 pos = texture2D( t_pos , uv );



  vec2 sR = uv + vec2( iSize , 0. );
  vec2 sL = uv - vec2( iSize , 0. );

  vec2 sUR = uv;
  vec2 sUL = uv;
  vec2 sDR = uv;
  vec2 sDL = uv;

  float row = mod( gl_FragCoord.y , 2. );

   if( row > .5 ){

    sUR.x += 0.;
    sUR.y += iSize;

    sUL.x -= iSize;
    sUL.y += iSize;
    
    sDR.x += 0.;
    sDR.y -= iSize;

    sDL.x -= iSize;
    sDL.y -= iSize;

  }else{

    sUR.x += iSize;
    sUR.y += iSize;

    sUL.x += 0.;
    sUL.y += iSize;
    
    sDR.x += iSize;
    sDR.y -= iSize;

    sDL.x += 0.;
    sDL.y -= iSize;

  }


  vec2 d = uv - vec2( .5+iSize / 2. );
    

  // Sets our 'seed' 
  // of the crystal
  if( length(d) < iSize/8. ){

    pos = vec4( 1.01 );
    pos.y = .00;
    pos.z = 1.;
    pos.w = -.1;

  }

  float t = atan( d.y , d.x );
  float r = length( d );

  float tA = PI * 2. / 6.;

  float tDif = abs(mod( t , tA)-tA*.5);
  int section = int(mod( t , 3.14159 * (2./6.) ));


  // Temperature
  // Level
  // crystalized



  float usable = canUse( sUR , sUL , sDR , sDL , sL , sR );
 

  // Order for dataPoints ( dP ) is RHR starting at right sample
  if( usable > .5 ){

    vec4 dP[ 6 ];

    dP[0] = texture2D( t_pos , sR  );
    dP[1] = texture2D( t_pos , sUR  );
    dP[2] = texture2D( t_pos , sUL  );
    dP[3] = texture2D( t_pos , sL  );
    dP[4] = texture2D( t_pos , sDL  );
    dP[5] = texture2D( t_pos , sDR  );

    // If we aren't part of the crystal,
    // cool slightly
   /* if( pos.z < .5 ){

      pos.y -= .000001;

    }*/


    if( pos.a > 0. ){
    for( int i = 0; i < 6; i++ ){


      //float v = float( i ) * 2. * PI;

      vec4 data = dP[i];

      // one of the neighbors is part of the crystal
      if( data.z > .5 ){

        //pos.y = (pos.y - data.y)*.5 + data.y;
       
        pos.y -= 10. * abs(snoise( vec2( r*8. , tDif*3. )));

        pos.a -= 10. * pow((tA * .5 - tDif), .5);// *(tA - tDif) *  (tA - tDif) ;


        if( pos.y < .1 ){
          pos.z = 1.;
          pos.x = 1.;
         //// pos.x = 1.;
        //if( pos.z > .5 ){
        ///    pos.x = 1.;
         // }
        }

      }else{

        float dTemp = pos.y - data.y;
       
        if( dTemp > 0. ){

          pos.y -= dTemp / 100.;

        }

      
      }

      //pos.x = pos.y;

      //pos.y -= dTemp / 30000.;

      // Pos is our current data
      // data is the other points data

      //pos.y +=  data.y * .1;
     // if( pos.y <= 10. ){

     // }

    /*  if( dP[i].x > 1. && snoise( vec2( r*500. , tDif*1. )) < .5 ){

        pos.x = min( 1.01 , pos.x + 1.);
        break;

      }*/

    }

    }

    /*vec4 uR = texture2D( t_pos , sUR );
    vec4 uL = texture2D( t_pos , sUL );
    vec4 dR = texture2D( t_pos , sDR );
    vec4 dL = texture2D( t_pos , sDL );
    vec4 r  = texture2D( t_pos , sR  );
    vec4 l  = texture2D( t_pos , sL  );*/

    /*if(
      dP[0].x > 1. || 
      dP[1].x > 1. || 
      dP[2].x > 1. || 
      dP[3].x > 1. || 
      dP[4].x > 1. || 
      dP[5].x > 1.  
    ){

      pos.x = min( 1.01 , pos.x + .1);

    }
    */
    
    //pos.x +=snoise( uv * 10. + vec2( sin( time * .1 ) , cos( time * .52)) ) * .0001;//.01;// snoise( uv.xy * 100000000000. ) * 100.;
  }

  gl_FragColor = pos;


}

