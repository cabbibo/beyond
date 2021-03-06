uniform sampler2D t_audio;

varying vec3 vCol;
varying vec3 vNorm;
varying vec4 vData;

uniform float debug;
void main(){


  if( debug == 0. ){
    gl_FragColor = vec4( vNorm * .5 + .5 , vData.x / 2. ) + vec4( vCol , length( vCol) );
  }else if( debug == 1. ){
    gl_FragColor = vec4( vCol , 1. );
  }else if( debug == 2. ){
    gl_FragColor = vData * 100.;
  }else{

    gl_FragColor = texture2D( t_audio ,vec2( abs(vNorm.x) , 0. ) ) * vec4( vNorm * .5 + .5 , 1. );

  }
 // gl_FragColor = vec4( vCol.x , vCol.y , vCol.z , 1. );
 // gl_FragColor = vec4( vCol.x ,vCol.y , .0, 1. );

}
