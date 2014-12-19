
  attribute vec3 tangent;
  uniform float time;
  
  varying vec2 vUv;
  varying vec3 eyeVec;
  varying mat3 tbnMatrix;
  varying vec3 pos;
  varying vec3 e;
  varying vec3 vNormal;

  mat3 m3( mat4 mIn ) {
      mat3 mOut;
      
      mOut[ 0 ][ 0 ] = mIn[ 0 ][ 0 ]; 
      mOut[ 0 ][ 1 ] = mIn[ 0 ][ 1 ]; 
      mOut[ 0 ][ 2 ] = mIn[ 0 ][ 2 ]; 
      
      mOut[ 1 ][ 0 ] = mIn[ 1 ][ 0 ]; 
      mOut[ 1 ][ 1 ] = mIn[ 1 ][ 1 ]; 
      mOut[ 1 ][ 2 ] = mIn[ 1 ][ 2 ]; 
      
      mOut[ 2 ][ 0 ] = mIn[ 2 ][ 0 ]; 
      mOut[ 2 ][ 1 ] = mIn[ 2 ][ 1 ]; 
      mOut[ 2 ][ 2 ] = mIn[ 2 ][ 2 ]; 
      
      return mOut;
  }

  void main() {
      vUv = uv;
      vec3 pos = position;// + 10. * vec3( cos( a + time ), 0., sin( a + time ) );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1. );
      vec3 n = m3( modelMatrix ) * normal; 
      vec3 t = m3( modelMatrix ) * tangent.xyz;
      vec3 b = m3( modelMatrix ) * cross( n, t );
      
      eyeVec = ( modelMatrix * vec4( pos, 1. ) ).xyz - cameraPosition;
      //eyeVec = ( modelViewMatrix * vec4( eyeVec, 1. ) ).xyz;
      vec3 v = vec3(
          dot( eyeVec, t ),
          dot( eyeVec, b ),
          dot( eyeVec, n )
      );
      eyeVec = normalize( v );
      vec4 p = vec4( position, 1. );
      e = normalize( vec3( modelViewMatrix * p ) );
     
      vNormal = normalMatrix * normal;
  }
