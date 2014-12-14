function initChoreography(){


  choreography = new Choreography();

  var c = choreography;

  c.addEvent( function(){

     console.log( 'TITLE FADE IN' );

    title.fadeIn(); 

  // First number has to be slightly above 0
  // because I don't know how to program
  } , 0.0001);

  c.addTweenEvent( title.rotation , {                                  
    x: title.rotation.x + .03,
    y: title.rotation.y + .5,
    z: title.rotation.z + .06,
  }, 3 , 10 );

  c.addTweenEvent( title.position , {                                  
    x: title.position.x + 0,
    y: title.position.y + 0,
    z: title.position.z - 3,
  }, 4. , 12 );

  c.addEvent( function(){

    console.log( 'TITLE FADE OUT' );
    title.fadeOut();

  } , 7.5 );


  // First Snowflake entrance
  c.addEvent( function(){

    var p = new THREE.Vector3( .1 , 0 , .5 );
    snowflakes[0].activate(p);

  } , 12.000 );

  c.tweenCamera( 
    [ 0 , 0 , 1 ] , 
    [ .1 , 0 , 1 ] , 
    12 ,
    23.890
  ); 

  c.positionCamera(
    [ 0 , 0 , .8 ],
    23.920
  );

  c.positionCamera(
    [ .2 , 0 , .8 ],    
    29.840          
  );

  c.positionCamera(
    [ .1 , 0 , 1 ],    
    32.687          
  );
 

  c.addTweenEvent( snowflakes[0].body.rotation,{
    x: snowflakes[0].body.rotation.x + .03,
    y: snowflakes[0].body.rotation.y + .1,
    z: snowflakes[0].body.rotation.z + .06,
  },23.920 , 29.800  );

  choreography.addEvent( function(){
    snowflakes[0].body.rotation.y -= .3;
  } ,  29.840  );

   choreography.addEvent( function(){
    snowflakes[0].body.rotation.y = 0;
    snowflakes[0].body.rotation.x = 0;
    snowflakes[0].body.rotation.z = 0;
  } , 32.687   );

 
  
  /*

     API INFO


  c.tweenCamera( 
    [ -1 , 0 , 1 ] ,  // Start Position
    [ 1 , 0 , 1 ] ,   // End Position
    1,                // Start time ( seconds ) 
    5                 // End Time ( seconds )
  );

  c.positionCamera(
    [ 0 , 0 , 1 ],    // Position
    5.01                // Time ( seconds )
  );


  c.addTweenEvent(
    snowflakes[1].body.rotation,        // Value to alter
    {                                   // Final Value
      x: snowflakes[1].body.rotation.x + .03,
      y: snowflakes[1].body.rotation.y + .1,
      z: snowflakes[1].body.rotation.z + .06,
    },
    3,                                  // Start Time ( seconds )
    5                                   // End Time ( seconds )
  );

  choreography.addEvent( function(){
  
    var p = new THREE.Vector3( 2 , 0 , -1 );
    snowflakes[1].activate(p);
  
  } , 3 );


*/
  //choreography.positionCamera( [ -1 , 0 , 1 ] , 4 );



}
