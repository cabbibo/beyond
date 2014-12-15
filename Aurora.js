function createAurora(){

  console.log( shaders.vs.aurora );
  console.log( shaders.fs.aurora );
  console.log( uniforms );
 
  var mat = new THREE.ShaderMaterial({

    uniforms: uniforms,
    vertexShader: shaders.vs.aurora,
    fragmentShader: shaders.fs.aurora,

    //blending: THREE.AdditiveBlending,
    transparent: true

  });

  var geo = new THREE.PlaneGeometry( 10 , 10 , 100 , 1 );

  console.log( mat );
  var mesh = new THREE.Mesh(geo , mat );

  return mesh;


}
