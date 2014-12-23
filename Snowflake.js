function Snowflake( ss , u ){

  this.active = false;

  //console.log( ss );
  this.ss = shaders.setValue( ss , 'SIZE' , SIM_SIZE+"." );

  this.soul = new DiffusionRenderer( SIM_SIZE , this.ss , renderer );


  this.uniforms = this.createNewUniforms( u );

  for( var propt in this.uniforms ){
    this.soul.setUniform( propt , this.uniforms[propt] );
  }

  // We need to make sure we have out own normal and depth
  this.t_depth = { type:"t" , value:null };
  this.t_normal = { type:"t" , value:null };

  this.uniforms.t_depth = this.t_depth;
  this.uniforms.t_normal = this.t_normal;
  
  //console.log( this.uniforms );
  this.soul.addBoundTexture( this.t_depth , 'output' );
  this.soul.addBoundTexture( this.t_normal , 'normal' );


 
  this.geo = new THREE.PlaneGeometry( 150, 150, 2, 2 );

  this.mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shaders.vs.cabSnow,
    fragmentShader: shaders.fs.cabSnow,
    shading: THREE.SmoothShading,
    side: THREE.DoubleSide,
    depthTest: false,
    depthWrite: false,
    transparent: true
  });

     /* console.log( shaders.vs );

           object = new THREE.Object3D();
      var geometry = new THREE.PlaneGeometry( 2, 2, 2, 2 );
     
      mesh = new THREE.Mesh( geometry, mat );
      mesh.geometry.computeTangents();
      object.add( mesh );
      mesh = new THREE.Mesh( geometry, mat );*/

  /*var vs = shaders.setValue( vs , 'SIZE' , SIM_SIZE-1 );
 
  this.mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vs,
    fragmentShader: fs,
   // side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false
  });*/

  this.body = new THREE.Object3D();

  for( var i = 0; i < 1; i ++ ){
    var mesh = new THREE.Mesh( this.geo , this.mat );
    mesh.geometry.computeTangents();
    var s = .5 + .5 * Math.random();
    mesh.position.z = i * 5;
    mesh.scale.set( s, s, s );
    this.body.add( mesh );
  }

  var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 10 , 10 ) , new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
  mesh.position.z = -5;
  //this.body.add( mesh );
  //this.body.add( mesh );


  // Do the reset on creation, so we don't have to 
  // do the extra renders when we add it to the scene 
  this.reset();

}


Snowflake.prototype.createNewUniforms = function(u){

  var newU = {};

  for( var propt in uniforms ){

    // Need our own tDepth
    if( propt != 't_depth' ){
      newU[ propt ] = uniforms[propt];
    }

  }

  // creating our own depth uniform
  newU.t_depth = { type:"t" , value: null }

  // For specific uniforms of snowflakes
  if( u ){
    for( var propt in u ){
      newU[ propt ] = u[ propt ]
    }
  }

  return newU;

}

Snowflake.prototype.update = function(){

  if( this.active == true ){
    this.soul.update();
  }

}

Snowflake.prototype.activate = function( position ){

  this.active = true;

  //this.reset();
  if( position ){

    this.body.position.copy( position );

  }

  scene.add( this.body );

}

Snowflake.prototype.deactivate = function(){

  this.active = false;

}

Snowflake.prototype.remove = function(){

  this.active = false;  
  scene.remove( this.body );

}

Snowflake.prototype.addInactive = function(){

  this.active = false;
  scene.add( this.body );

}

/*Snowflake.prototype.addInactive = function(){

  this.active = false;
  scene.add( this.body );

}*/

Snowflake.prototype.reset = function(){

  this.soul.reset( RESET_TEXTURE );

}

Snowflake.prototype.debug = function(){

/*var geo = createHexGridGeometry( SIM_SIZE -1);


      var vs = shaders.setValue( shaders.vs.debugMesh , 'SIZE' , SIM_SIZE-1 );
      var mat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: shaders.fs.debugMesh,
        side: THREE.DoubleSide,
        transparent: true
      });
      //var mesh = new THREE.Mesh( geo , mat );

      //scene.add( mesh );


      debugMesh = new THREE.Mesh( geo , mat );
      scene.add( debugMesh);

      var vs = shaders.setValue( shaders.vs.test1 , 'SIZE' , SIM_SIZE-1 );
      var mat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: shaders.fs.test1,
        side: THREE.DoubleSide,
        linewidth:5
      });

      var lineGeo = createHexGridLineGeometry( SIM_SIZE-1 );
      debugLines = new THREE.Line( lineGeo , mat , THREE.LinePieces );
      scene.add( debugLines );
      debugLines.position.z = .001;

      debugLines.visible = false;
      debugPoints = new THREE.PointCloud( geo , mat );
      scene.add(debugPoints);
      debugPoints.position.z = .001;
      debugPoints.visible = false;


      var ss = shaders.setValue( shaders.ss.test1 , 'SIZE' , SIM_SIZE+"." );
      grower = new DiffusionRenderer( SIM_SIZE , ss , renderer );
      grower.setUniform( 'time' , uniforms.time  );
      grower.setUniform( 'dT' , uniforms.dT  );
      grower.setUniform( 't_audio' , uniforms.t_audio  );

      grower.addBoundTexture( uniforms.t_depth , 'output' );

      resetGrowth(); */

}
