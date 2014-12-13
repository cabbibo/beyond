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



  vec2 modVec[6];


  modVec[0] = vec2( iSize , 0. );
  modVec[3] = vec2( -iSize , 0. );


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
    
    sDL.x -= iSize;
    sDL.y -= iSize; 
    
    sDR.x += 0.;
    sDR.y -= iSize;


    modVec[1] = vec2( 0. , iSize );
    modVec[2] = vec2( -iSize , iSize );
    modVec[4] = vec2( -iSize , -iSize );
    modVec[5] = vec2( 0. , -iSize );

    /*modVec[1] = vec2( iSize , iSize );
    modVec[2] = vec2( 0. , iSize );
    modVec[4] = vec2( 0 , -iSize );
    modVec[5] = vec2( iSize , -iSize );*/


  }else{

    sUR.x += iSize;
    sUR.y += iSize;

    sUL.x += 0.;
    sUL.y += iSize;
    
    sDL.x += 0.;
    sDL.y -= iSize;
    
    sDR.x += iSize;
    sDR.y -= iSize;

    modVec[1] = vec2( iSize , iSize );
    modVec[2] = vec2( 0. , iSize );
    modVec[4] = vec2( 0 , -iSize );
    modVec[5] = vec2( iSize , -iSize );

    /*modVec[1] = vec2( 0. , iSize );
    modVec[2] = vec2( -iSize , iSize );
    modVec[4] = vec2( -iSize , -iSize );
    modVec[5] = vec2( 0. , -iSize );*/


  }



  float rand = float( 99. * abs( cos( sin( time * 1000.51612) * cos( time * 10000.12615 ) ) ));

  int rand6 = int( mod( rand , 6. ) );
  vec2 d = uv - vec2( .5+iSize / 2. );
    

  // Sets our 'seed' 
  // of the crystal
  if( length(d) < iSize/8. ){

    pos = vec4( 1.01 );
    pos.y = .00;
    pos.z = 1.;
    pos.a = -.1;

  }

  float t = atan( d.y , d.x ) + 3.14159;
  float r = length( d );

  float tA = PI * 2. / 6.;

  float tDif = abs(mod( t , tA)-tA*.5);
  int section = int(mod( t , 3.14159 * (2./6.) ));


  // Temperature
  // Level
  // crystalized

  vec4 audio = texture2D( t_audio , vec2( t , 0.)  );


  // Limits our growth using alpha, and makes sure
  // we don't hit the edge
  if( pos.a > 0. && length( d )  < .5){
    
    float usable = canUse( sUR , sUL , sDR , sDL , sL , sR );
   

    vec2 fromCenter = d;

    // Order for dataPoints ( dP ) is RHR starting at right sample
    if( usable > .5 ){


      // If we are part of the crystal,
      if( pos.z > .5 ){
  

        vec4 dP[ 6 ];
        vec2 s[ 6 ];

        s[0] = sR; s[1] = sUR; s[2] = sUL; 
        s[3] = sL; s[4] = sDL; s[5] = sDR;

        dP[0] = texture2D( t_pos , s[0] );
        dP[1] = texture2D( t_pos , s[1] );
        dP[2] = texture2D( t_pos , s[2] );
        dP[3] = texture2D( t_pos , s[3] );
        dP[4] = texture2D( t_pos , s[4] );
        dP[5] = texture2D( t_pos , s[5] );
       
       // if( audio.x > .0 ){
        // pos.a -=  pow((tA * .5 - tDif), .3); 
        for( int i = 0; i < 6; i++ ){

          if( i != int( pos.y ) ){
            vec4 data = dP[i];
            pos.x += .1;//data.z;
          }
        }

    
      // If we aren't part of the crystal
      }else{

        
        vec4 dP[ 6 ];
        vec2 s[ 6 ];

        s[0] = sR; s[1] = sUR; s[2] = sUL; 
        s[3] = sL; s[4] = sDL; s[5] = sDR;

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
          if( data.z > .5){
    
            pos.z += data.z * .1;
            pos.x += 1.;
            pos.y = float( i );

            break;
          }
        }
      }

    }
  }

  gl_FragColor = pos;


}

