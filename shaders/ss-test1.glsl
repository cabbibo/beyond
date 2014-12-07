const float size = @SIZE;

uniform vec2 resolution;

uniform sampler2D t_pos;
uniform sampler2D t_oPos;
uniform sampler2D t_og;

uniform float time;
uniform sampler2D t_audio;

varying vec2 vUv;

$simplex
$canUse

void main(){

  float iSize = 1. / size;

  vec2 uv = gl_FragCoord.xy / resolution ;
  vec4 pos = texture2D( t_pos , uv );

  
  if( length(uv - vec2(.5 )) < iSize ){

    pos.x = 1.01;

  }



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

    /*vec4 uR = texture2D( t_pos , sUR );
    vec4 uL = texture2D( t_pos , sUL );
    vec4 dR = texture2D( t_pos , sDR );
    vec4 dL = texture2D( t_pos , sDL );
    vec4 r  = texture2D( t_pos , sR  );
    vec4 l  = texture2D( t_pos , sL  );*/

    if(
      dP[0].x > 1. || 
      dP[1].x > 1. || 
      dP[2].x > 1. || 
      dP[3].x > 1. || 
      dP[4].x > 1. || 
      dP[5].x > 1.  
    ){

      pos.x = min( 1.01 , pos.x + .1);

    }
    
    
    //pos.x +=snoise( uv * 10. + vec2( sin( time * .1 ) , cos( time * .52)) ) * .0001;//.01;// snoise( uv.xy * 100000000000. ) * 100.;
  }

  gl_FragColor = pos;


}

