function Choreography(){

  this.events = [];


}

Choreography.prototype.addEvent = function( cb , t ){

  this.events.push( [ cb , t ] );

}

Choreography.prototype.addTweenEvent = function(){


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
