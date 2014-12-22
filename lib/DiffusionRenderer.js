function DiffusionRenderer( size , shader , renderer ){

  // First Make sure everything Works
  this.checkCompatibility( renderer );
  this.renderer = renderer;
  
  this.size = size || 1024;
  this.s2   = size * size;

  this.renderer = renderer;

  this.clock = new THREE.Clock();

  this.resolution = { 
    type:"v2" , 
    value: new THREE.Vector2( this.size , this.size )
  }
  
  this.normalMapper = new NormalMapper( 512 , renderer );

  // Sets up our render targets
  this.rt_1 = new THREE.WebGLRenderTarget( this.size, this.size, {
    //minFilter: THREE.LinearFilter,
    //magFilter: THREE.LinearFilter,
    //minFilter: THREE.NearestFilter,
    //magFilter: THREE.NearestFilter,

    format: THREE.RGBAFormat,
    type:THREE.FloatType,
    stencilBuffer: false
  });

  //this.rt_1.generateMipmaps = false;

  this.rt_2 = this.rt_1.clone();
  this.rt_3 = this.rt_1.clone();
  
  // Will contain ours corrected image
  this.corrected = this.rt_1.clone();

  this.counter = 0;

  this.debugScene = this.createDebugScene();
  this.texturePassProgram = this.createTexturePassProgram();
  this.correctionProgram = this.createCorrectionProgram();

  this.blur = this.createBlurProgram();
  this.zero = this.createZeroProgram();
  
  // WHERE THE MAGIC HAPPENS
  this.simulation = this.createSimulationProgram( shader );
  this.material = this.simulation;

  this.boundTextures = [];

  /*
    
    GPGPU Utilities
    From Sporel by Mr.Doob
    @author mrdoob / http://www.mrdoob.com

  */  
  
  this.camera = new THREE.OrthographicCamera( - 0.5, 0.5, 0.5, - 0.5, 0, 1 );
  this.scene = new THREE.Scene();
  this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ) );
  this.scene.add( this.mesh );
  
}

DiffusionRenderer.prototype.checkCompatibility = function( renderer ){
  
  var gl = renderer.context;

  if ( gl.getExtension( "OES_texture_float" ) === null ) {
    this.onError( "No Float Textures"); 
    return;
  }

  if ( gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ) === 0 ) {
    this.onError( "Vert Shader Textures don't work"); 
    return;
  }
  
}

DiffusionRenderer.prototype.onError = function( e ){
  console.log( e );
}

DiffusionRenderer.prototype.createDebugScene= function(){



  var debugScene = new THREE.Object3D();
  debugScene.position.z = 0;

  var geo = new THREE.PlaneGeometry( 1 , 1 );
    
  var debugMesh = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({
    map:  this.rt_1,
    transparent: true
  }));
  debugMesh.position.set( -1.1 , 0 , 0 );

  debugScene.add( debugMesh );

  this.debug1 = debugMesh;
      
  var debugMesh = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({
    map: this.rt_1,
    transparent: true
  }));
  debugMesh.position.set( 0 , 0 , 0 );
  debugScene.add( debugMesh );

  this.debug2 = debugMesh;
  


  var debugMesh = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({
    map: this.rt_1,
    transparent: true
  }));
  debugMesh.position.set( 1.1 , 0 , 0 );


  debugScene.add( debugMesh );
  this.debug3 = debugMesh;
  



  return debugScene;

}

DiffusionRenderer.prototype.removeDebugScene = function( scene ){
  scene.remove( this.debugScene );
}

DiffusionRenderer.prototype.addDebugScene = function( scene ){
  scene.add( this.debugScene );
}

DiffusionRenderer.prototype.debug = function(s ){

  this.createDebugScene();
  this.addDebugScene( s );

}

DiffusionRenderer.prototype.createTexturePassProgram = function(){

  var uniforms = {
    texture:{  type:"t"  , value:null },
  }

  var texturePassShader = new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader:this.VSPass,
    fragmentShader:this.FSPass,
  });

  return texturePassShader;

}

DiffusionRenderer.prototype.createBlurProgram = function(){

  var uniforms = {
    texture:    { type: "t"   , value: null },
    dir:        { type: "v2"  , value: new THREE.Vector2() },
    resolution: { type: "f"   , value: this.size },
    radius:     { type: "f"   , value: .2 },
    blurRatio:  { type: "f"   , value: 0}
  }

  var blurShader = new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader:this.VSPass,
    fragmentShader:this.FSBlur,
  });

  return blurShader;

}

DiffusionRenderer.prototype.createCorrectionProgram = function(){
 
  var fs = shaders.setValue( shaders.fs.hexCorrection , 'SIZE' , this.size + "." );


  var uniforms = {
    texture:    { type: "t"   , value: null },
    resolution: { type: "f"   , value: this.size },
  }

  var correction = new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader:this.VSPass,
    fragmentShader:fs,
  });

  return correction;

}



DiffusionRenderer.prototype.createSimulationProgram = function(sim){

  this.simulationUniforms = {
    t_pos:{   type:"t"  , value:null },
    resolution: this.resolution
  }


  var program = new THREE.ShaderMaterial({

    uniforms:this.simulationUniforms,
    vertexShader:this.VSPass,
    fragmentShader:sim

  });

  return program;

}

DiffusionRenderer.prototype.createZeroProgram = function(sim){

  var program = new THREE.ShaderMaterial({

    vertexShader:this.VSPass,
    fragmentShader:this.FSZero

  });

  return program;

}




DiffusionRenderer.prototype.VSPass = [
  "varying vec2 vUv;",
  "void main() {",
  "  vUv = uv;",
  "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
  "}"
].join("\n");

DiffusionRenderer.prototype.FSPass = [
  "uniform sampler2D texture;",
  "varying vec2 vUv;",
  "void main() {",
  "  vec4 c = texture2D( texture , vUv );",
  "  gl_FragColor = c ;",
  "}"
].join("\n");


DiffusionRenderer.prototype.FSZero = [
  "void main() {",
  "  gl_FragColor = vec4(0.) ;",
  "}"
].join("\n");

DiffusionRenderer.prototype.FSBlur = [
  "uniform sampler2D texture;",
  "uniform float resolution;",
  "uniform float radius;",
  "uniform vec2 dir;",
  "uniform float blurRatio;",
  "varying vec2 vUv;",
  "void main() {",
  "float blur = radius/resolution;",
  "float hstep = dir.x;",
  "float vstep = dir.y;",
  "vec4 sum = vec4(0.0);",
  "vec4 pass = texture2D( texture , vUv );",
  "sum += texture2D(texture, vec2(vUv.x - 4.0*blur*hstep, vUv.y - 4.0*blur*vstep)) * 0.0162162162;",
  "sum += texture2D(texture, vec2(vUv.x - 3.0*blur*hstep, vUv.y - 3.0*blur*vstep)) * 0.0540540541;",
  "sum += texture2D(texture, vec2(vUv.x - 2.0*blur*hstep, vUv.y - 2.0*blur*vstep)) * 0.1216216216;",
  "sum += texture2D(texture, vec2(vUv.x - 1.0*blur*hstep, vUv.y - 1.0*blur*vstep)) * 0.1945945946;",

  "sum += texture2D(texture, vec2(vUv.x, vUv.y)) * 0.2270270270;",

  "sum += texture2D(texture, vec2(vUv.x + 1.0*blur*hstep, vUv.y + 1.0*blur*vstep)) * 0.1945945946;",
  "sum += texture2D(texture, vec2(vUv.x + 2.0*blur*hstep, vUv.y + 2.0*blur*vstep)) * 0.1216216216;",
  "sum += texture2D(texture, vec2(vUv.x + 3.0*blur*hstep, vUv.y + 3.0*blur*vstep)) * 0.0540540541;",
  "sum += texture2D(texture, vec2(vUv.x + 4.0*blur*hstep, vUv.y + 4.0*blur*vstep)) * 0.0162162162;",
    //"  gl_FragColor = vec4(sum.rgb * blurRatio + pass.rgb * (1.-blurRatio) , pass.a);",
    "  gl_FragColor = vec4(sum.r * blurRatio + pass.r * (1.-blurRatio), pass.g , pass.b , pass.a);",
  "}"
].join("\n");

DiffusionRenderer.prototype.update = function(){

  var flipFlop = this.counter % 2;
  
  if( flipFlop == 0 ){

   /* this.blur.uniforms.dir.value.set( 1 , 0 );
    this.blur.uniforms.texture.value = this.rt_1;
    this.pass( this.blur , this.rt_2 );
    
    this.blur.uniforms.dir.value.set( 0 , 1 );
    this.blur.uniforms.texture.value = this.rt_2;
    this.pass( this.blur , this.rt_1 );*/

    this.simulation.uniforms.t_pos.value = this.rt_1;

    this.pass( this.simulation, this.rt_2 );

    this.oOutput = this.rt_1;
    this.output = this.rt_2;

    this.correct( this.output );
    

    this.normalMapper.createNormalMap( this.corrected , 100.1 , 1/1024 );
    this.normal = this.normalMapper.output;

  }else if( flipFlop == 1 ){
   
   /* this.blur.uniforms.dir.value.set( 1 , 0 );
    this.blur.uniforms.texture.value = this.rt_2;
    this.pass( this.blur , this.rt_1 );
    
    this.blur.uniforms.dir.value.set( 0 , 1 );
    this.blur.uniforms.texture.value = this.rt_1;
    this.pass( this.blur , this.rt_2 );*/

    this.simulation.uniforms.t_pos.value = this.rt_2;

    this.pass( this.simulation , this.rt_1 );

    this.oOutput = this.rt_2;
    this.output = this.rt_1;

    this.correct( this.output );
   // this.corrected = this.correctImage( this.output );

    this.normalMapper.createNormalMap( this.corrected , 100.1 , 1/1024 );

    this.normal = this.normalMapper.output;
   

  }

  this.counter ++;

  this.debug1.material.map = this.output;
  this.debug2.material.map = this.corrected;
  this.debug3.material.map = this.normal;
  this.bindTextures();

}

// Some GPGPU Utilities author: @mrdoob
DiffusionRenderer.prototype.render = function ( scene, camera, target ) {
  renderer.render( scene, camera, target, false );
};

DiffusionRenderer.prototype.pass = function ( shader , target ) {
  this.mesh.material = shader;
  this.renderer.render( this.scene, this.camera, target, false );
};

DiffusionRenderer.prototype.out = function ( shader ) {
  this.mesh.material = shader.material;
  this.renderer.render( this.scene, this.camera );
};


// Used if he have uniforms we want to update!
DiffusionRenderer.prototype.setUniforms = function( uniforms ){
  
  this.simulation.uniforms = uniforms || {};

  // Have to make sure that these always remain!
  this.simulation.uniforms.t_pos = { value:"t" , value:null }; 
  this.simulation.uniforms.resolution = this.resolution;

  console.log( this.simulation.uniforms );

}

DiffusionRenderer.prototype.setUniform = function( name , u ){
  this.simulation.uniforms[name] = u;
}

// resets the render targets to the from position
DiffusionRenderer.prototype.reset = function( texture ){

  this.texture = texture;
  this.texturePassProgram.uniforms.texture.value = texture;
  
  this.pass( this.texturePassProgram , this.rt_1 );
  this.pass( this.texturePassProgram , this.rt_2 );

}

DiffusionRenderer.prototype.setZero = function( texture ){

  this.pass( this.zero , this.rt_1 );
  this.pass( this.zero , this.rt_2 );

}


DiffusionRenderer.prototype.correct = function( texture ){

  this.correctionProgram.uniforms.texture.value = texture;
  this.pass( this.correctionProgram , this.corrected );


}



DiffusionRenderer.prototype.addBoundTexture = function( uniform , value ){
  this.boundTextures.push( [ uniform , value ] );
}

DiffusionRenderer.prototype.bindTextures = function(){

  for( var i = 0; i < this.boundTextures.length; i++ ){

   // var boundSystem = this.boundTextures[i][0];
    var boundUniform = this.boundTextures[i][0];
    var textureToBind = this.boundTextures[i][1];

    //var uniform = boundSystem.material.uniforms[ boundUniform ];
    boundUniform.value = this[ textureToBind ];


  }

}

