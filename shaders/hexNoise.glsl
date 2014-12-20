float hexNoise( vec2 pHex , float gridSize , float noiseSize ){
  
  pHex *= gridSize;
  pHex.x *= .69282;

  vec2 pCenter = getCenterPos( pHex );


  float n = snoise( abs(pCenter) * noiseSize/gridSize ) ;
  return n;

}


