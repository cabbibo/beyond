uniform sampler2D t_height;
uniform sampler2D t_normal;
uniform sampler2D t_matCap;
uniform sampler2D t_detailNormal;
uniform sampler2D t_pano;
uniform sampler2D t_audio;
uniform mat3 normalMatrix;
uniform float time;
varying vec2 vUv;
varying vec3 e;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec3 vEye;
float PI = 3.14159265358979323846264;
vec2 normalToUV( vec3 n ) {
	vec3 normal = normalize( n );
	float lon = atan( normal.z , - normal.x );
	float lat = asin( - normal.y );
	vec2 uv = 0.5 - vec2( lon, lat ) / vec2( PI * 2.0, PI );
    return uv;
}
void main() {
	mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );
	vec3 heightNormal = normalize( .5 * texture2D( t_normal, vUv ).rgb * 2.0 - 1.0 );
	//vec3 heightNormal = normalize( .5 * vec3( .5, .5, 1. ).rgb * 2.0 - 1.0 );
	vec3 detailNormal = normalize( 1. * texture2D( t_detailNormal, 5. * vUv ).rgb * 2.0 - 1.0 );
	vec3 n = normalize( tsb * normalize( heightNormal + detailNormal ) );
	vec3 eye = normalize( vEye );
    vec3 r = reflect( eye, n );
    float m = 2. * sqrt( 
        pow( r.x, 2. ) + 
        pow( r.y, 2. ) + 
        pow( r.z + 1., 2. ) 
    );
    vec2 vN = r.xy / m + .5;
	vec3 light = texture2D( t_matCap, vN ).rgb;
    vec3 env = texture2D( t_pano, normalToUV( r ) ).rgb;
    vec3 refract = texture2D( t_pano, normalToUV( refract( eye, n, .1 ) ) ).rgb;
	vec3 color = clamp( env + light, 0., 1. );
	//color = light; // alabaster looking flakes
	color = mix( refract, env, .7 );
	float rimPower = 1.;
	float useRim = 1.;
	float f = clamp( rimPower * abs( dot( n, normalize( vEye ) ) ), 0., 1. );
	f = smoothstep( .6, 1., f ); // <- controls glass look
	color += vec3( f ); // <- much icier
	float a =  length( color ) * texture2D( t_normal, vUv ).a;

    vec4 aColor = texture2D( t_audio , vec2(abs( sin( m * 1. )) , 0. ) );
   // vec4 aColor = 
	gl_FragColor = (aColor + .5) * vec4( color, a /100. );

   // gl_FragColor = vec4( 1. );
//	gl_FragColor = vec4( .5 + .5 * n, 1. );
}
