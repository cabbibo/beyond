uniform float depth;
uniform sampler2D t_normal;

varying vec2 vUv;
varying vec3 vEye;
//varying vec3 vLight;

varying vec3 vMVPos;
varying vec3 vMPos;
varying vec3 vPos;

void main(){
  vUv = uv;
 
  float d = texture2D( t_normal , uv ).w;
  
  vPos  = position + vec3( 0. , 0. , d * 10.);
  vMVPos = (modelViewMatrix * vec4(vPos , 1. )).xyz; 
  vMPos  = (modelMatrix * vec4( vPos, 1. )).xyz; 

 // vLight = normalize((modelMatrix * vec4( vPos , 1. )).xyz - lightPos); 

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1. );

}
