  
uniform sampler2D t_matcap;
  
varying vec2 vSEM;
varying vec3 vEye;
varying vec3 vNorm;
varying float vFR;

void main(){


  vec4 sem = texture2D( t_matcap , vSEM );

  vec4 nCol =  vec4( vNorm * .5 + .7 , 1. );

  vec4 color = nCol * sem + nCol * pow(( 1.-abs(vFR)) , 10. );
  gl_FragColor =color;// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );

}

