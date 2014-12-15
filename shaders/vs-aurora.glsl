
uniform sampler2D t_audio;

varying vec2 vUv;
varying vec4 vAudio;

void main(){

  vUv = uv;

  vAudio = texture2D( t_audio, vec2( uv.x , 0. ) );

  vec3 pos = position +vec3( 0. , 0. ,  length( vAudio ) * .1 );

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos , 1. );

}
