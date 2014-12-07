



const int size = @SIZE;

uniform sampler2D t_depth;
varying vec3 vCol;

void main(){

  vec4 depth = texture2D( t_depth , position.xy );   

  vec3 pos;
 // pos.z = depth.x;

  pos.z = 0.;

  // Gets our position centered x
  pos.x = position.x - .5;
  pos.y = (position.y - .5); //* sqrt( 3. ) / 2.;

  pos.x -=  ((1. / float( size ))) * position.z * .5;

  vCol.z = position.z;
  vCol.x = mod( float( size ) * position.x , 2. );
  vCol.y = mod( float( size ) * position.y , 2. );


  gl_PointSize=10.;/// length(vec3(modelMatrix * vec4( pos.xyz , 1. )).xyz);
 

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos.xyz , 1. );
  //gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1. );


}
