
uniform sampler2D t_normal;
varying vec2 vUv;
void main(){

  vec4 col = texture2D( t_normal , vUv );

  gl_FragColor = vec4( col.xyz , 1. );

}
