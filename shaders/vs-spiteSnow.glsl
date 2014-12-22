attribute vec4 tangent;
uniform float time;
varying vec2 vUv;
varying mat3 tbnMatrix;
varying vec3 pos;
varying vec3 e;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec3 vEye;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );
   
	vNormal = normalize( normalMatrix * normal );
	vTangent = normalize( normalMatrix * tangent.xyz );
	vBinormal = cross( vNormal, vTangent );
	vec3 vertexPosition = vec3( modelViewMatrix * vec4( position, 1. ) );
	vEye = normalize( vec3( 
		dot( vertexPosition, vTangent ),
		dot( vertexPosition, vBinormal ),
		dot( vertexPosition, vNormal )
	) );
	vec4 p = vec4( position, 1. );
	vEye = normalize( vec3( modelViewMatrix * p ) );
}

