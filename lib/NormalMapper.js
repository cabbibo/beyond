function NormalMapper( size, fs , renderer ){

  this.size  = size || 1024;

  if( !fs ){ console.log('NOSSDS' ); }

  this.output = new THREE.WebGLRenderTarget( this.size, this.size, {
    format: THREE.RGBAFormat,
    stencilBuffer: false
  });

  this.camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, 0, 1 );
  this.scene = new THREE.Scene();
  this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ) );
  this.scene.add( this.mesh );

  this.uniforms = {
    t_depth:{  type:"t"  , value:null },
    size:{ type:"f" , value: 1/this.size},
    depth:{type:"f" , value: .001 }
  }

  this.program = new THREE.ShaderMaterial({
    uniforms:this.uniforms,
    vertexShader:this.VSPass,
    fragmentShader:fs
  });


  this.canvas = document.createElement( 'canvas' );
  this.canvas.width  = size;
  this.canvas.height = size;

  this.context = this.canvas.getContext('2d');


  this.renderer = renderer;

}

NormalMapper.prototype.createNormalMap = function( t_depth, depth , size ){

  this.uniforms.t_depth.value = t_depth;
  this.uniforms.depth.value = depth;
  this.uniforms.size.value = size;
  this.pass( this.program , this.output );
  
  
 // this.out( this.program );

 /* var imgData = this.renderer.domElement.toDataURL();  
    
  
  var a = document.createElement('a');
  a.href = imgData;
  a.download ="normal.png";
  a.click();*/


}

NormalMapper.prototype.VSPass = [
  "varying vec2 vUv;",
  "void main() {",
  "  vUv = uv;",
  "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
  "}"
].join("\n");

// Some GPGPU Utilities author: @mrdoob
NormalMapper.prototype.render = function ( scene, camera, target ) {
  renderer.render( scene, camera, target, false );
};

NormalMapper.prototype.pass = function ( shader , target ) {
  this.mesh.material = shader;
  this.renderer.render( this.scene, this.camera, target  );
};

NormalMapper.prototype.out = function ( shader ) {
  this.mesh.material = shader.material;
  this.renderer.render( this.scene, this.camera );
};
