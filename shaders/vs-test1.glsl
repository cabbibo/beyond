



const int size = @SIZE;

uniform sampler2D t_depth;
varying vec3 vCol;

$getFunctions

void main(){

  vec4 depth = texture2D( t_depth , position.xy );   

  vec3 pos = getXYZPos( t_depth, position );
 // pos.z = 0.;

  
  vCol.z = position.z;
  vCol.x = mod( float( size ) * position.x , 2. );
  vCol.y = mod( float( size ) * position.y , 2. );


  gl_PointSize=20.;/// length(vec3(modelMatrix * vec4( pos.xyz , 1. )).xyz);
 

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos.xyz , 1. );
  //gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1. );


}
