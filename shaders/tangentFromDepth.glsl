vec3 tangentFromDepth( sampler2D dMap , vec2 uv , float depth , float size ){

  vec2 lL = uv - vec2( size , 0. );
  vec2 rL = uv + vec2( size , 0. );
  vec2 dL = uv - vec2( 0. , size );
  vec2 uL = uv + vec2( 0. , size );

  if( uv.x < size ){      lL.x = uv.x; }
  if( uv.x > 1. - size ){ rL.x = uv.x; }
  if( uv.y < size ){      dL.y = uv.y; }
  if( uv.y > 1. - size ){ dL.y = uv.y; }

  float lD = texture2D( dMap , lL ).r; 
  float rD = texture2D( dMap , rL ).r; 
  float dD = texture2D( dMap , dL ).r; 
  float uD = texture2D( dMap , uL ).r; 

  vec3 lV = vec3( lL , lD * depth );
  vec3 rV = vec3( rL , rD * depth );
  vec3 dV = vec3( dL , dD * depth );
  vec3 uV = vec3( uL , uD * depth );

  vec3 v1 = rV - lV;
  vec3 v2 = uV - dV;

  return normalize(v1);//normalize( cross( v1 , v2 ) );

}
