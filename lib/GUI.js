

function GUI( PARAMS ,  params ){

  this.params = _.defaults( params || {} ,{
    domElement: document.body,
  });


  console.log( this.params );
  this.PARAMS = PARAMS;

  this.gui = new dat.GUI({autoPlace:false});
  this.gui.close();

  // TODO: make passable
  this.domElement = this.params.domElement;
  this.domElement.appendChild(this.gui.domElement);

  for( var propt in PARAMS ){
    
    if( propt !== 'time' ){
      var p = PARAMS[propt];

      if( p.type === "f" ){

        if(p.constraints ){
          this.addFloat( p , propt , p.constraints );
        }else{
          this.addFloat( p , propt );
        }
      
      }else if(  p.type === "color" ){

        this.addColor( p ,  propt );

      }
    }


  }



}

// Need to create an extra varible call tmp_color1  to be able to use
GUI.prototype.addColor = function(  object , name ){

  var actualObject = name.split( 'tmp_' )[1];

  if( actualObject !== 'bg' ){
  this.gui.addColor( object , 'value' ).name( actualObject ).onChange(function(v){
    
    this.PARAMS[actualObject].value.setHex( v )

  }.bind( this ) );

  }else{

    this.gui.addColor( object , 'value' ).name( actualObject ).onChange(function(v){
    
      this.PARAMS[actualObject].value.setHex( v )
      renderer.setClearColor( v , 1. );

    }.bind( this ) );




  }


}

GUI.prototype.addFloat = function(  object , name , constraints ){

  if( constraints ){
    this.gui.add( object , 'value' , constraints[0] , constraints[1] ).name( name ); 
  }else{
    this.gui.add( object , 'value' ).name( name ); 
  }

}


