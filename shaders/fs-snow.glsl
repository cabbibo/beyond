  
uniform sampler2D t_matcap;
uniform float filled;
  
varying vec2 vSEM;
varying vec3 vEye;
varying vec3 vNorm;
varying float vFR;

varying float vFade;
varying float vEdge;
varying float vID;

void main(){


  vec4 sem = texture2D( t_matcap , vSEM );

  vec4 nCol =  vec4( vNorm * .5 + .7 , 1. );

  vec4 color = nCol * sem + nCol * pow(( 1.-abs(vFR)) , 10. );

  if( vID + vFade*( 1. + vEdge )> filled ){

    color.w =  0. ;

  }


  gl_FragColor = ( 1. - pow( vFR , 10. ))* color;// + vEdge * vEdge * vEdge * (vec4( 1.1 ) - color);// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
 // gl_FragColor = vEdge * vec4( 1., 0. , 0. , 1. ) + vec4( 0. , 0. , 1. , 0. );//* color;// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
  //gl_FragColor =vec4( vec3(max( 0. ,  dot( vNorm , vec3( 1. , 0. , 0. ) ))) , 1. );//* color;// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
 // gl_FragColor =vec4( vec3( vFade , 0. , 0. )+ vec3( 0. , 0. , 1. ) , 1. );//* color;// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
  
//  gl_FragColor =vec4( 1. );// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );

}

