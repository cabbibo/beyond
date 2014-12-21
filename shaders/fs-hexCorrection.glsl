
uniform sampler2D texture;
uniform float resolution;

float size = @SIZE;

//varying vec2 vUv;

void main(){


  float iSize = 1. / size;
  vec2 uv = gl_FragCoord.xy / vec2(resolution);

  uv.x += .5 *  ( mod( uv.y * resolution , 2. ) / resolution) -.5/ resolution;

  vec4 pos = texture2D( texture, uv );

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

  }else{

    sUR.x += iSize;
    sUR.y += iSize;

    sUL.x += 0.;
    sUL.y += iSize;
    
    sDL.x += 0.;
    sDL.y -= iSize;
    
    sDR.x += iSize;
    sDR.y -= iSize;

  }

  vec4 dP[ 6 ];
  vec2 s[ 6 ];

  s[0] = sR; s[1] = sUR; s[2] = sUL; 
  s[3] = sL; s[4] = sDL; s[5] = sDR;

  dP[0] = texture2D( texture , s[0] );
  dP[1] = texture2D( texture , s[1] );
  dP[2] = texture2D( texture , s[2] );
  dP[3] = texture2D( texture , s[3] );
  dP[4] = texture2D( texture , s[4] );
  dP[5] = texture2D( texture , s[5] );

  vec4 newPos = vec4(0.);
  for( int i = 0; i < 6; i++ ){
    newPos += dP[i];
  }

  newPos /= 6.;


  gl_FragColor =  newPos;
  


}
