
varying vec3 vCol;
void main(){


  gl_FragColor = vec4( vCol.x , vCol.y , vCol.z , 1. );
 // gl_FragColor = vec4( vCol.x ,vCol.y , .5, 1. );

}
