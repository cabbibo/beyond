varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 delta;

void main() {

	vec4 sum = vec4( 0. );
	
	sum += texture2D( tInput, ( vUv - delta * 4. ) ) * 0.051;
	sum += texture2D( tInput, ( vUv - delta * 3. ) ) * 0.0918;
	sum += texture2D( tInput, ( vUv - delta * 2. ) ) * 0.12245;
	sum += texture2D( tInput, ( vUv - delta * 1. ) ) * 0.1531;
	sum += texture2D( tInput, ( vUv + delta * 0. ) ) * 0.1633;
	sum += texture2D( tInput, ( vUv + delta * 1. ) ) * 0.1531;
	sum += texture2D( tInput, ( vUv + delta * 2. ) ) * 0.12245;
	sum += texture2D( tInput, ( vUv + delta * 3. ) ) * 0.0918;
	sum += texture2D( tInput, ( vUv + delta * 4. ) ) * 0.051;

	gl_FragColor = sum;

}