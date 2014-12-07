
varying vec3 vCol;
varying vec3 vNorm;
varying vec4 vData;

uniform float debug;
void main(){


  if( debug == 0. ){
    gl_FragColor = vec4( vNorm * .5 + .5 , 1. );
  }else if( debug == 1. ){
    gl_FragColor = vec4( vCol , 1. );
  }else{
    gl_FragColor = vData * 100.;
  }
 // gl_FragColor = vec4( vCol.x , vCol.y , vCol.z , 1. );
 // gl_FragColor = vec4( vCol.x ,vCol.y , .0, 1. );

}
