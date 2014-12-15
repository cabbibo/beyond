


function initText( quoteText ){


  title = textCreator.createMesh( "B E Y O N D" , {
    size: .1
  });

  title.material.opacity = 0;


  quote = new THREE.Object3D();
  quote.lines = [];
  
  for( var i = 0; i < quoteText.length; i++ ){

    if( quoteText[i] !== "" ){
      var line =textCreator.createMesh( quoteText[i] , {
        size: .1
      });

      line.position.y = -1.2* (( (i+.5) / quoteText.length) - .5 )
      quote.add( line );
      quote.lines.push( line );

    }

  }

  quote.scale.multiplyScalar( .3 );

  quote.fadeOut = function(){

    var i = { o: 0 };
    var f = { o: 1 };
    
    var t = new TWEEN.Tween( i ).to( f , 5000 ); 

    t.title = this;
    t.onUpdate( function( v ){
      for( var i = 0; i < this.lines.length; i++ ){
        this.lines[i].material.opacity = 1-v;
      }
    }.bind( this ));

    t.onComplete( function(){
      scene.remove( this );
    }.bind(this) );

    t.start();

  }.bind( quote );

  title.fadeIn = function(){

    scene.add( this );
    var i = { o: 0 };
    var f = { o: 1 };
    
    var t = new TWEEN.Tween( i ).to( f , 8000 ); 

    t.title = this;
    t.onUpdate( function( v ){
      this.material.opacity = v;
    }.bind( this ));

    t.start();

  }.bind( title );

  title.fadeOut = function(){

    var i = { o: 0 };
    var f = { o: 1 };
    
    var t = new TWEEN.Tween( i ).to( f , 3000 ); 

    t.title = this;
    t.onUpdate( function( v ){
      this.material.opacity = 1-v;
    }.bind( this ));

    t.onComplete( function(){

      scene.remove( this );

    }.bind(this) );

    t.start();

  }.bind( title );






}
