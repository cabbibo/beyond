function IntersectPlane( eye , distance , domElement ){

  this.tmpV3 = new THREE.Vector3();
  this.faceCamera = true;

  this.distance   = distance    || 10;
  this.domElement = domElement  || document;

  this.plane = new THREE.Mesh(
   new THREE.PlaneGeometry( 100000000 , 10000000 ),
   new THREE.MeshNormalMaterial()
  );

  this.marker = new THREE.Mesh(
   new THREE.IcosahedronGeometry( this.distance / 10, 2 ),
   new THREE.MeshNormalMaterial()
  );

  this.position = this.plane.position;
  this.point    = new THREE.Vector3();

  //this.plane.visible = false;

}

IntersectPlane.prototype.debug = function( scene ){

  scene.add( this.plane );
  scene.add( this.marker );

}

IntersectPlane.prototype.update = function(){

  if( this.faceCamera == true ){

    this.position.copy( this.camera.position );
    var vector = new THREE.Vector3( 0 , 0 , -this.iPlaneDistance );
    vector.applyQuaternion( this.camera.quaternion );

    this.tmpV3.set(  0 , 0 , -this.distance );
    this.tmpV3.applyQuaternion( this.eye.quaternion );

    this.position.add( this.tmpV3 );
    this.plane.lookAt( this.eye.position );

  }

  this.tmpV3.copy( this.mouse );
  this.tmpV3.sub( this.eye.position );
  this.tmpV3.normalize();

  this.raycaster.set( this.eye.position ,  this.tmpV3 );
  var intersects = this.raycaster.intersectObject( this.plane );

  if( intersects.length > 0 ){
    this.point.copy( intersects[0].point );
  }else{
    console.log('NOT HITTING IPLANE!');
  }


}




G.updateIntersection = function(){

  if( this.iPlane.faceCamera == true ){
    
    this.iPlane.position.copy( this.camera.position );
    var vector = new THREE.Vector3( 0 , 0 , -this.iPlaneDistance );
    vector.applyQuaternion( this.camera.quaternion );
    this.iPlane.position.add( vector );
    this.iPlane.lookAt( this.camera.position );

    this.iObj.lookAt( this.camera.position );

  }else{

    G.tmpV3.set( 0 , 0 , 1 );
    G.tmpV3.applyQuaternion( this.iPlane.quaternion );

    var lookat =this.iObj.position.clone().add( G.tmpV3 );

    this.iObj.lookAt( lookat ); 

  }


  G.tmpV3.copy( this.mouse );

  if( this.objectControls.leap === true ){

    G.tmpV3.copy(this.rHand.hand.position);
 
  }
  
  G.tmpV3.sub( this.camera.position );
  G.tmpV3.normalize();

  
  this.raycaster.set( this.camera.position ,  G.tmpV3 );

  var intersects = this.raycaster.intersectObject( this.iPlane );

  if( intersects.length > 0 ){
  
    this.iPoint.copy( intersects[0].point );
    this.iPoint.relative.copy( this.iPoint );
    this.iPoint.relative.sub( this.position );
    this.iDir.copy( G.tmpV3 );
   // bait.position.copy( intersects[0].point );
  }else{
    //console.log('NOT HITTING IPLANE!');
  }


}

