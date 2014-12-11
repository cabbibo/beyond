function Choreography(){

  this.events = [];


}

Choreography.prototype.addEvent = function( cb , t ){

  this.events.push( [ cb , t ] );

}

Choreography.prototype.addTweenEvent = function( valueToTween , endValue , t1 , t2 ){

  var i = valueToTween
  var f = endValue;

  var t = new TWEEN.Tween( i ).to( f , (t2 - t1 ) * 1000 );

  t.onUpdate( function(){

  });

  var cb = function(){
    
    t.start();
  
  }

  this.addEvent( cb , t1 );




}

Choreography.prototype.tweenCamera = function( p1 , p2 , t1 , t2 ){

  var i = { x: p1[0] , y:p1[1] , z:p1[2] }
  var f = { x: p2[0] , y:p2[1] , z:p2[2] }

  var t = new TWEEN.Tween( i ).to( f , (t2 - t1 ) * 1000 );

  t.onUpdate( function(){
    camera.position.copy( i );
  });

  var cb = function(){
    
    camera.position.copy( i );
    t.start();

  }

  this.addEvent( cb , t1 );


}

Choreography.prototype.positionCamera = function( p , t ){


  var cb = function(){
    camera.position.set( p[0] , p[1] , p[2] );
  }

  this.addEvent( cb , t );

}


// Checks to see if any events should be called
Choreography.prototype.update = function(){

  var oTime = uniforms.time.value - uniforms.dT.value;
  var time  = uniforms.time.value;
    
  for( var i=0; i < this.events.length; i++ ){

    var t = this.events[i][1];

    if( t <= time && t > oTime ){
      this.events[i][0]();
    }

  }


}
