
varying vec2 vUv;
varying vec4 vAudio;

void main(){

 
  vec3 c = vAudio.x * vec3( .6 , .0 , .3 );
  c+= vAudio.y * vec3( .3 , .0 , .9 );
  c += vAudio.z * vec3( .2 , .9 , .7 );
  c=  normalize( c);
  gl_FragColor = vec4( c ,  vAudio.a * (1. - vUv.y));

}
