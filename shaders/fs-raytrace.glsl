uniform sampler2D t_depth;
uniform sampler2D t_normal;
uniform sampler2D t_matcap;
uniform sampler2D t_pano;
uniform sampler2D t_detailNormal;
uniform sampler2D t_audio;
uniform mat3 normalMatrix;
uniform float time;

varying vec2 vUv;
varying vec3 eyeVec;
varying vec3 e;
varying vec3 vNormal;

float PI = 3.14159265358979323846264;
/*
	vec3 vVec = normalize( view );  
	vec4 bumpNormal = texture2D( normalMap, vUv );  
	vec3 n = bumpNormal.rgb * 2.0 - 1.0;
	vec3 modifiedTangent = normalize( vec3( n.xy * bumpiness, sqrt( 1. - n.y * n.y - n.x * n.x ) ) );
	vec3 nVec = tbnMatrix * modifiedTangent;
*/
vec2 normalToUV( vec3 n ) {
	vec3 normal = normalize( n );
	float lon = atan( normal.z , - normal.x );
	float lat = asin( - normal.y );
	vec2 uv = 0.5 - vec2( lon, lat ) / vec2( PI * 2.0, PI );
    return uv;
}
void main() {
	//vec3 vVec = normalize( view );  
	//vec3 nVec = tbnMatrix * modifiedTangent;
	vec3 d = normalize( eyeVec );
	float depth = 0.;
	int found = 0;
	float shade = 0.;
	vec2 vUv2 = vec2( 1. - vUv.x, vUv.y );
	d.y *= -1.;
	vec2 uv2;
	const float layers = 10.;
	float step = .0025;
	float luh = 0.;
	float previousLuh = 0.;
	for( float j = 0.; j < layers; j ++ ){
		if( found == 0 ) {
			uv2 = vUv2 + step * d.xy * j / d.z;
			if( uv2.x < 0. || uv2.x > 1. || uv2.y < 0. || uv2.y > 1. ) {
				gl_FragColor = vec4( 1., 0., 1., 0. );
				return;
			}
			luh = 1. - texture2D( t_normal, uv2  ).a /3.;


			if( luh < depth ){ 
				float x = ( previousLuh - luh + ( j / layers ) - ( ( j - 1. ) / layers ) ) / ( previousLuh - ( j - 1. ) / layers );
				depth = previousLuh + ( luh - previousLuh ) / x;
				found = 1;
			} else {
				depth = j / layers;
			}
			previousLuh = luh;
		}
	}
	float c = depth;
	if( found == 0 ) c = 1.;
	uv2 = vUv2 + step * d.xy * ( depth * layers ) / d.z;
	vec3 heightNormal = texture2D( t_normal, uv2 ).rgb;
	vec3 detailNormal = texture2D( t_detailNormal, 5. * uv2 ).rgb;
	vec3 n = normalize( vNormal + heightNormal + detailNormal );
	vec3 eye = normalize( e );
    vec3 r = reflect( eye, n );
    float m = 2. * sqrt( 
        pow( r.x, 2. ) + 
        pow( r.y, 2. ) + 
        pow( r.z + 1., 2. ) 
    );
    vec2 vN = r.xy / m + .5;
	vec3 light = texture2D( t_matcap, vN ).rgb;
	//color = color + color + color;
    vec3 env = texture2D( t_pano, normalToUV( r ) ).rgb;
	vec3 rR = refract( normalize( e ), n, .6 );
	vec3 rEnv = texture2D( t_pano, normalToUV( rR ) ).rgb;
	vec3 color = .1 + vec3( 95. / 255., 185. / 255., 255. / 255. ) * ( .5 * env + .5 * light ) + pow( light, vec3( 2. ) );//mix( env, rEnv, .2 ) + light;
	float a = texture2D( t_normal, uv2 ).a * 3.;
    vec4 audio = texture2D( t_audio,vec2( vN.x, 0. ) );
    audio *= texture2D( t_audio,vec2( vN.y, 0. ) );
    

  	gl_FragColor = vec4( color, a ) * (vec4( .3 ) + audio *.7 );

  /*  vec2 correctedLookup = vUv;
    correctedLookup *= 512.;
    // = floor( correctedLookup );
    float off = mod( floor( correctedLookup.y ) , 2. );
    correctedLookup.x += off;//abs(off - .5 );

    correctedLookup /= 512.;


    vec3 fCol =  max( vec3( 0. ) , (texture2D( t_normal , vUv )).xyz);
   // fCol += vec3( .1 , .1 , .1 ) * off;

    //vec3 fCol = (texture2D( t_depth , vUv )).xyz / 10.+ vec3( .1 , .1 , .1 ) * off; 
	gl_FragColor = vec4( fCol , 1. );*/
}
	
