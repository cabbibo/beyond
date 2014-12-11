function initChoreography(){


  choreography.addEvent( function(){

    snowflakes[0].activate();

  } , 1 );


  choreography.addEvent( function(){

    var p = new THREE.Vector3( 2 , 0 , -1 );
    snowflakes[1].activate(p);

  } , 3 );

  
  choreography.addEvent( function(){

    snowflakes[0].deactivate();

    var p = new THREE.Vector3( -1 , 0 , 0 );
    snowflakes[2].activate(p);

  } , 4 );



}
