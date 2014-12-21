function NormalMapper( size, renderer ){

  this.size  = size || 1024;

  this.output = new THREE.WebGLRenderTarget( this.size, this.size, {
    format: THREE.RGBAFormat,
    type:THREE.FloatType,
    stencilBuffer: false
  });

  //this.output.generateMipmaps = false;

  this.camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, 0, 1 );
  this.scene = new THREE.Scene();
  this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ) );
  this.scene.add( this.mesh );

  this.uniforms = {
    t_depth:{  type:"t"  , value:null },
    size:{ type:"f" , value: 1/this.size},
    depth:{type:"f" , value: .001 }
  }


  this.fs = shaders.setValue( shaders.fs.depthToNormal , 'SIZE' , this.size + "." );

  this.program = new THREE.ShaderMaterial({
    uniforms:this.uniforms,
    vertexShader:this.VSPass,
    fragmentShader:this.fs
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

/*NormalMapper.prototype.fs = [
  
  "uniform sampler2D t_depth;",
  "uniform float depth;",
  "uniform float size;",
  "",
  "varying vec2 vUv;",
  "",
  "vec3 normalFromDepth( sampler2D dMap , vec2 uv , float depth , float size ){",

  "  vec2 lL = uv - vec2( size , 0. );",
  "  vec2 rL = uv + vec2( size , 0. );",
  "  vec2 dL = uv - vec2( 0. , size );",
  "  vec2 uL = uv + vec2( 0. , size );",
  "",
  "  if( uv.x < size ){      lL.x = uv.x; }",
  "  if( uv.x > 1. - size ){ rL.x = uv.x; }",
  "  if( uv.y < size ){      dL.y = uv.y; }",
  "  if( uv.y > 1. - size ){ dL.y = uv.y; }",
  "",
  "  float lD = texture2D( dMap , lL ).r;",
  "  float rD = texture2D( dMap , rL ).r;",
  "  float dD = texture2D( dMap , dL ).r;", 
  "  float uD = texture2D( dMap , uL ).r;", 
  "",
  "  vec3 lV = vec3( lL , lD * depth );",
  "  vec3 rV = vec3( rL , rD * depth );",
  "  vec3 dV = vec3( dL , dD * depth );",
  "  vec3 uV = vec3( uL , uD * depth );",
  "",
  "  vec3 v1 = rV - lV;",
  "  vec3 v2 = uV - dV;",
  "",
  "  return normalize( cross( v1 , v2 ) );",
  "",
  "}",

  "void main(){",
  "",
  "  float d = texture2D( t_depth , vUv ).r;",
  "  vec2 set = vUv * 512.;",
  "  set = floor( set );",
  "  float alt = mod( set.y , 2. );",
  "  vec2 os = vUv * 512. - vec2( alt * 0. , 0. );",
  "  os /= 512.;",
  "  vec3 norm = normalFromDepth( t_depth , os , depth , size*1.1 );",
  "  gl_FragColor = vec4( norm* .5 + .5 , d / 10. );",
  "",
  "}"


].join("\n");*/

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
