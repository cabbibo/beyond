uniform sampler2D t_depth;

uniform float depth;
uniform float size;


varying vec2 vUv;

$normalFromDepth

void main(){

  float d = texture2D( t_depth , vUv ).r;
  vec3 norm = normalFromDepth( t_depth , vUv , depth , size*1.1 );
  gl_FragColor = vec4( norm* .5 + .5 , d / 10. );

}


