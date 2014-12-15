function initChoreography(){

  sections = [

    0, // start
    11.9, // first snowflake
    39.24, // second snowflake
    59.8,  // third snowflake
    91.8
  ]

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



  /*
  

     FIRST SNOWFLAKE 


  */

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
    [ .1 , 0 , .8 ],    
    32.687          
  );

  c.tweenCamera( 
    [ .1 , 0 , 1. ] , 
    [ .1 , 0 , 1.2 ] , 
    32.690 ,
    39.250 
  ); 
 

  c.addTweenEvent( snowflakes[0].body.rotation,{
    x: snowflakes[0].body.rotation.x + .03,
    y: snowflakes[0].body.rotation.y + .1,
    z: snowflakes[0].body.rotation.z + .06,
  },23.920 , 29.800  );

  choreography.addEvent( function(){
    snowflakes[0].body.rotation.y -= .3;
  } ,  29.830  );

   choreography.addEvent( function(){
    snowflakes[0].body.rotation.y = 0;
    snowflakes[0].body.rotation.x = 0;
    snowflakes[0].body.rotation.z = 0;
  } , 32.687   );

 

   
  /*
  
    SECOND SNOWFLAKE 

  */

   
  choreography.addEvent( function(){
    snowflakes[0].remove();
    snowflakes[1].activate();
  } , 39.25   );

   c.positionCamera(
    [ .2 , 0 , .8 ],
    39.25
   );

  c.tweenCamera( 
    [ .2 , 0 , .8 ] , 
    [ .2 , 0 , .6 ] , 
    39.25 ,
    49.38 
  ); 


  c.tweenCamera( 
    [ .2 , 0 , .5 ] , 
    [ .1 , 0 , .5 ] , 
    49.405,
    55.325
  );

  c.tweenCamera( 
    [ .05 , 0 , .3 ] , 
    [ -.05 , 0 , .3 ] , 
    55.325,
    59.873
  );

  c.addTweenEvent( snowflakes[1].body.rotation,{
    x: snowflakes[1].body.rotation.x + .03,
    y: snowflakes[1].body.rotation.y + .2,
    z: snowflakes[1].body.rotation.z + .06,
  }, 55.325, 59.873  );


  c.positionCamera(
    [ -.3 , .1 , .4 ],
    59.9
  );

  c.addEvent( function(){

   snowflakes[1].deactivate();

   var p = new THREE.Vector3( -.5 , .5 , -.5 );
   snowflakes[2].activate( p );

  } , 59.9 );

  c.addTweenEvent( snowflakes[1].body.rotation,{
    x: snowflakes[1].body.rotation.x + .03,
    y: snowflakes[1].body.rotation.y - .5,
    z: snowflakes[1].body.rotation.z + .06,
  }, 59.9 , 66.500 );

   c.addTweenEvent( snowflakes[1].body.position,{
    x: snowflakes[1].body.position.x + .1,
    y: snowflakes[1].body.position.y - .01,
    z: snowflakes[1].body.position.z + .1,
  }, 59.9 , 66.500 );

  c.tweenCamera( 
    [ -.3 , .1 , .4 ], 
    [ -.35 , .15 , .4 ] , 
    59.9 , 66.500 
  );

  c.tweenCamera( 
    [ -.5 , .5 , -0. ],
    [ -.5 , .5  , 1.4 ] , 
    66.55 , 88.850
  );

  c.addEvent( function(){

   snowflakes[1].remove();

  } , 73.250 );

  
  c.addEvent( function(){

   snowflakes[2].deactivate();

   var p = new THREE.Vector3( -.8 , .2 , .0 );
   snowflakes[3].activate( p );

  } , 73.250 );

  c.addEvent( function(){
   snowflakes[3].deactivate();

  var p = new THREE.Vector3( -.3, .7 , .6 );
   snowflakes[4].activate( p );
  } ,  79.960 );

  c.addEvent( function(){
   snowflakes[4].deactivate();
  } ,  87.075  );



  c.addTweenEvent( snowflakes[2].body.rotation,{
    x: snowflakes[2].body.rotation.x + .1,
    y: snowflakes[2].body.rotation.y - .1,
    z: snowflakes[2].body.rotation.z + .1,
  }, 87.075 , 88.873 );

    c.addTweenEvent( snowflakes[3].body.rotation,{
    x: snowflakes[3].body.rotation.x + .3,
    y: snowflakes[3].body.rotation.y + .1,
    z: snowflakes[3].body.rotation.z + .2,
  }, 87.075 , 88.873 );

  c.addTweenEvent( snowflakes[4].body.rotation,{
    x: snowflakes[4].body.rotation.x - .3,
    y: snowflakes[4].body.rotation.y + .2,
    z: snowflakes[4].body.rotation.z + .2,
  }, 87.075 , 88.873 );



  c.addTweenEvent( snowflakes[2].body.rotation,{
    x: snowflakes[2].body.rotation.x - .1,
    y: snowflakes[2].body.rotation.y + .1,
    z: snowflakes[2].body.rotation.z - .1,
  }, 88.873 , 91.844 );

    c.addTweenEvent( snowflakes[3].body.rotation,{
    x: snowflakes[3].body.rotation.x - .3,
    y: snowflakes[3].body.rotation.y - .1,
    z: snowflakes[3].body.rotation.z - .2,
  }, 88.873 , 91.844 );

  c.addTweenEvent( snowflakes[4].body.rotation,{
    x: snowflakes[4].body.rotation.x + .3,
    y: snowflakes[4].body.rotation.y - .2,
    z: snowflakes[4].body.rotation.z - .2,
  }, 88.873 , 91.844 );


  /*
  
     TODO: This seems to move everythign to 0. , .5 , 0.,
     not what we want?

  */
 // -.8 , .2 , .0
  c.addTweenEvent( snowflakes[2].body.position,{
    x: snowflakes[2].body.position.x,
    y: .5,
    z: snowflakes[2].body.position.z,
  }, 88.873 , 91.844 );

  c.addTweenEvent( snowflakes[3].body.position,{
    x: snowflakes[3].body.position.x, 
    y: .5,
    z: snowflakes[3].body.position.z,
  }, 88.873 , 91.844 );

  c.addTweenEvent( snowflakes[4].body.position,{
    x: snowflakes[4].body.position.x,
    y: .5,
    z: snowflakes[4].body.position.z,
  }, 88.873 , 91.844 );


  c.addEvent( function(){

    console.log( quote );
    scene.add( quote );
    quote.position.set( -.5 , .5  , -.5 );
    quote.rotation.set( .1 , .3 , .1 );

  } , 91.844 );
  
  c.addTweenEvent( quote.rotation,{
    x: 0,
    y: 0,
    z: 0,
  }, 91.844 , 102 );

   c.tweenCamera( 
     [ -.5 , .5  , 1.4 ] ,
     [ -.5 , .5  , 0 ] , 
    91.844, 97
  );


  c.addEvent( function(){

   quote.fadeOut();

  }, 110 );

  c.addEvent( function(){

    end();

  }, 115);



//  87.075
//  88.873
//  91.844
  /*
  

     THIRD SNOWFLAKE


  */



  /*
  

     ENDING


  */

  
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
