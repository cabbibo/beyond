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



  if( pos.a > 0. && length( d )  < .5){
    
    float usable = canUse( sUR , sUL , sDR , sDL , sL , sR );
   

    vec2 fromCenter = d;

    // Order for dataPoints ( dP ) is RHR starting at right sample
    if( usable > .5 ){


      // If we aren't part of the crystal,
      // cool slightly
      if( pos.z > .5 ){
          vec4 audio = texture2D( t_audio , vec2( abs( length( fromCenter ) ) , 0. ));

      //  if( pos.a 
         pos.a -=5.5;
        // pos.a -= 200.4  * tDif * length( audio ) *  length( fromCenter )* length( fromCenter )* length( fromCenter ) + 2.5;

       // pos.y -= .1 * ( 1. / length(fromCenter ) ) * tDif ;

        /*if( pos.y < 0. ){
          pos.z = 1.;
          pos.x = 1.;
        }

        pos.a -= 1.;*/
         
         
        // pos.x += (4. + length( audio ))/4.;
         pos.x +=1.;
    
      }else{

            
          vec4 audio = texture2D( t_audio , vec2( abs( 1.-tDif ) , 0. ));
       
          float multiplier =  abs(snoise( abs(vec2( pow(r,.1) * 5. , 1. -tDif * .1 ) ) ));

         
          pos.a -= .1;
         pos.a -= abs(multiplier) * length( audio )  * length( audio ) * 4.1  * tDif;

        
        vec4 dP[ 6 ];
        vec2 s[ 6 ];

        s[0] = sR;
        s[1] = sUR;
        s[2] = sUL;
        s[3] = sL;
        s[4] = sDL;
        s[5] = sDR;

        dP[0] = texture2D( t_pos , s[0] );
        dP[1] = texture2D( t_pos , s[1] );
        dP[2] = texture2D( t_pos , s[2] );
        dP[3] = texture2D( t_pos , s[3] );
        dP[4] = texture2D( t_pos , s[4] );
        dP[5] = texture2D( t_pos , s[5] );

            

       // if( audio.x > .0 ){
        // pos.a -=  pow((tA * .5 - tDif), .3); 
        for( int i = 0; i < 6; i++ ){
          vec4 data = dP[i];
          if( data.z > .5 ){

            vec2 dA = s[i] - vec2( .5+iSize / 2. );

            float match = dot( d  , d-dA );
            vec4 audio = texture2D( t_audio , vec2( abs(match) , 0. ));

            //float multiplier = snoise( abs(vec2(pow(r,.1) * 10.  , tDif * 2. ) ) );
            if(abs( multiplier )< audio.x){

              multiplier *= 0.5;
              
            }else{

              multiplier *= 3.;
            }

            pos.y -= 40.* (10./pos.a) * length( audio ) * ( multiplier *  multiplier  * 5. +1.5 );// * data.x;

            if( pos.y < 0. ){

              pos.z += .2;
            //  pos.x += length( audio );
              pos.a -= length( audio ) * length( audio )  * 5.;

            }

          }
        
       // }

        }

   

       // pos.a -= 2.;
      }

    }
  }

  gl_FragColor = pos;


}

