
attribute vec3 position1;
attribute vec3 position2;

uniform sampler2D t_crystal;
uniform float depth;
uniform vec3 lightPos;

varying vec2 vUv;
varying vec3 vNorm;

varying vec2 vSEM;
varying float vDis;

varying vec3 vLight;
varying float vFR;
varying vec3 vEye;

varying mat3 vNormMat;

varying float vSize;

const float size = @SIZE;

$semLookup
$normalFromDepth


void main(){

  vSize = size;
  //vNorm = normalize( (position - position1) + (position2 - position1) );

 // vNorm = normalize( cross( (position - position1) , (position2 - position1) ));

  vec3 d = texture2D( t_crystal , position.xy ).xyz;
  vec3 d1 = texture2D( t_crystal , position1.xy ).xyz;
  vec3 d2 = texture2D( t_crystal , position2.xy ).xyz;

  vDis = d.r;
   

  vUv = position.xy;

  vec3 pos  = position.xyz  + vec3( -.5 , -.5 , depth * d.r  );
  vec3 pos1 = position1.xyz + vec3( -.5 , -.5 , depth * d1.r );
  vec3 pos2 = position2.xyz + vec3( -.5 , -.5 , depth * d2.r );
  
  vNorm =normalMatrix * normalFromDepth( t_crystal , position.xy , depth , size*2. );
  //vNorm =  normalize(normalMatrix * normalize( cross( (pos - pos1) , (pos2 - pos1) )));

  vNormMat = normalMatrix;

  vec4 mPos = modelMatrix * vec4( pos * 50., 1.0 );

  vLight = normalize( mPos.xyz - lightPos );
  vec4 mvPos = modelViewMatrix * vec4( pos * 50., 1.0 );
  
  vEye = normalize( mvPos.xyz );

  vFR = max( 0. ,dot(-vEye , vNorm ) );

  vSEM = semLookup( vEye , vNorm );

  gl_PointSize = 3.;
  gl_Position = projectionMatrix * mvPos;


}
