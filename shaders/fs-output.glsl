uniform sampler2D t_normal;
uniform vec3 lightPos[ 4 ];
uniform vec3 lightCol[ 4 ];
uniform float depth;

varying vec2 vUv;
varying vec3 vEye;
//varying vec3 vLight;
varying vec3 vMVPos;
varying vec3 vMPos;
varying vec3 vPos;
void main(){

  vec3 eye = normalize( vMVPos.xyz );
  vec3 normal = (texture2D( t_normal , vUv ).xyz * 2.) - vec3( 1. );
  vec3 color = vec3( 0. );
 
  float totalDot = 0.;
  for( int i = 0; i < 4; i++ ){

    vec3 pos = lightPos[i];
    vec3 col = lightCol[i];

    float d = max( 0. , dot( normal.xyz , normalize(vMPos.xyz - pos )));
    totalDot += d;
    color += d * col;


  }

//  vec3 light =  -(vMPos.xyz - lightPos) / 10.; //); 



  gl_FragColor = vec4( color ,totalDot * 10. );// texture2D( t_normal , vUv ).w * 100. );//vec4( dot( normal.xyz, light.xyz ) * vec3( 1. ), 1. );//vec4( normal , 1. );

  //abs(max(0.,dot(normalize(normal.xyz),normalize(-light))))* vec4(1.);

}


