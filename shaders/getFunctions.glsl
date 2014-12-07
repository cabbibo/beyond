
vec2 getXYPos( vec3 position ){

  vec2 newPos;

  newPos.x = position.x - .5;
  newPos.y = position.y - .5;
  newPos.x -= ((1. / float( size ))) * position.z * .5;

  return newPos;

}


vec4 getDepth( sampler2D texture, vec3 position ){

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
  pos.z   = (getDepth( texture , position  )).x * .01 ;
  
  return pos;

}
