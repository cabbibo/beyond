const float size = @SIZE;

uniform sampler2D t_depth;
$getFunctions
$canUse
varying vec2 vUv;

void main(){
  float iSize = 1./float( size );

  vec3 uv = vec3( vUv  , 0.);
  uv *= size;
  uv  = floor( uv );
  uv /= size;

  vec3 norm;
  vec3 col;
  
 // float row = mod( float( size ) * position.y , 2. );
  vec3 pos = getXYZPos( t_depth , uv );



  vec3 sR = uv + vec3( iSize , 0. , 0. ); 
  vec3 sL = uv - vec3( iSize , 0. , 0. );

  float row = 0.;// mod( float( size ) * uv.y , 2. );


  vec3 sUR = uv;
  vec3 sUL = uv;
  vec3 sDR = uv;
  vec3 sDL = uv; 
 
  if( row > .5 ){

    sUR.x += 0.;
    sUR.y += iSize;
    sUR.z  = 0.;

    sUL.x -= iSize;
    sUL.y += iSize;
    sUL.z  = 0.;
    
    sDR.x += 0.;
    sDR.y -= iSize;
    sDR.z  = 0.;

    sDL.x -= iSize;
    sDL.y -= iSize;
    sDL.z  = 0.;

  }else{

    sUR.x += iSize;
    sUR.y += iSize;
    sUR.z  = 1.;

    sUL.x += 0.;
    sUL.y += iSize;
    sUL.z  = 1.;
    
    sDR.x += iSize;
    sDR.y -= iSize;
    sDR.z  = 1.;

    sDL.x += 0.;
    sDL.y -= iSize;
    sDL.z  = 1.;

  }

  float usable = canUse( sUR.xy , sUL.xy , sDR.xy , sDL.xy , sL.xy , sR.xy );

  if( usable < .5 ){

    col = vec3( 1. );
    norm = vec3( 0. , 0. , 1. );

  }else{


    vec3 uR = getXYZPos( t_depth , sUR );
    vec3 uL = getXYZPos( t_depth , sUL );
    vec3 dR = getXYZPos( t_depth , sDR );
    vec3 dL = getXYZPos( t_depth , sDL );
    vec3 r  = getXYZPos( t_depth , sR  ); 
    vec3 l  = getXYZPos( t_depth , sL  ); 

    norm = vec3( 0. );
   
    vec3 f1 = normalize(cross( ( pos - uR ) , ( pos- uL ) ));
    vec3 f2 = normalize(cross( ( pos - uL ) , ( pos- l  ) ));
    vec3 f3 = normalize(cross( ( pos - l  ) , ( pos- dL ) ));
    vec3 f4 = normalize(cross( ( pos - dL ) , ( pos- dR ) ));
    vec3 f5 = normalize(cross( ( pos - dR ) , ( pos- r  ) ));
    vec3 f6 = normalize(cross( ( pos - r  ) , ( pos- uR ) ));

    norm += f1; 
    norm += f2; 
    norm += f3; 
    norm += f4; 
    norm += f5; 
    norm += f6; 


    //vCol = vec3( 0. );
    norm = normalize( norm );

  }

  gl_FragColor = vec4( norm * .5 + .5 , pos.z );

}
