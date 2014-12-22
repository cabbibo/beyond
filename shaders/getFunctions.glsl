
vec2 getXYPos( vec3 position ){

  vec2 newPos;

  newPos.x = position.x - .5;
  newPos.y = position.y - .5;

  //get which row
  float row = mod( float( size ) * position.y , 2. );
  newPos.x += ((1. / float( size ))) * row * 1.;

  return newPos;

}



vec4 getDepth( sampler2D texture, vec3 position ){

  vec4 depth = texture2D( texture , position.xy );  
  return depth;

}

vec4 getDepth( sampler2D texture, vec2 position ){

  vec4 depth = texture2D( texture , position.xy );  
  return depth;

}

vec3 getXYZPos( sampler2D texture, vec3 position, float depthRatio ){

  vec3 pos;

  pos.xy  = getXYPos( position );
  pos.z   = (getDepth( texture , position  )).x * depthRatio ;
  
  return pos;

}

vec3 getXYZPos( sampler2D texture, vec3 position ){

  vec3 pos;

  pos.xy  = getXYPos( position );
  pos.z   = (getDepth( texture , position  )).x *4.1;
  
  return pos;

}


