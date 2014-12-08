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
    pos.a = -.1;

  }

  float t = atan( d.y , d.x );
  float r = length( d );

  float tA = PI * 2. / 6.;

  float tDif = abs(mod( t , tA)-tA*.5);
  int section = int(mod( t , 3.14159 * (2./6.) ));


  // Temperature
  // Level
  // crystalized



  if( pos.a > 0. ){
    
    float usable = canUse( sUR , sUL , sDR , sDL , sL , sR );
   

    vec2 fromCenter = d;

    // Order for dataPoints ( dP ) is RHR starting at right sample
    if( usable > .5 ){


      // If we aren't part of the crystal,
      // cool slightly
      if( pos.z > .5 ){


        pos.y -= .1 * ( 1. / length(fromCenter ) ) * tDif ;

        /*if( pos.y < 0. ){
          pos.z = 1.;
          pos.x = 1.;
        }

        pos.a -= 1.;*/
      
      }else{

        vec4 dP[ 6 ];

        dP[0] = texture2D( t_pos , sR  );
        dP[1] = texture2D( t_pos , sUR  );
        dP[2] = texture2D( t_pos , sUL  );
        dP[3] = texture2D( t_pos , sL  );
        dP[4] = texture2D( t_pos , sDL  );
        dP[5] = texture2D( t_pos , sDR  );


        // pos.a -=  pow((tA * .5 - tDif), .3); 
        for( int i = 0; i < 6; i++ ){
          vec4 data = dP[i];
          if( data.z > .5 ){

            float multiplier = abs(snoise( abs(vec2( r * 100.1 , 400. * r * tDif ) ) ));
            if( multiplier < tDif ){

              multiplier = 0.;
              
            }else{

              multiplier = 1.;
            }
            pos.y -= 40. * multiplier ;// * data.x;

            if( pos.y < 0. ){

              pos.z = 1.;
              pos.x += 1.;
              pos.a -=2.;

            }

          }
        
        }

   

       // pos.a -= 2.;
      }

    }
  }

  gl_FragColor = pos;


}

