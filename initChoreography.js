function initChoreography(){


  choreography = new Choreography();

  var c = choreography;

  c.addEvent( function(){

    snowflakes[0].activate();

  // First number has to be slightly above 0
  // because I don't know how to program
  } , 0.0001);

  c.tweenCamera( 
    [ -1 , 0 , 1 ] ,  // Start Position
    [ 1 , 0 , 1 ] ,   // End Position
    1,                // Start time ( seconds ) 
    5                 // End Time ( seconds )
  );

  c.positionCamera(
    [ 0 , 0 , 1 ],    // Position
    5                 // Time ( seconds )
  );

  choreography.addEvent( function(){
  
    var p = new THREE.Vector3( 2 , 0 , -1 );
    snowflakes[1].activate(p);
  
  } , 3 );

  
  choreography.addEvent( function(){

    snowflakes[0].deactivate();

    var p = new THREE.Vector3( -1 , 0 , 0 );
    snowflakes[2].activate(p);

  } , 4 );

  //choreography.positionCamera( [ -1 , 0 , 1 ] , 4 );



}
