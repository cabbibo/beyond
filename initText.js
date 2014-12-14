


function initText( quoteText ){


  title = textCreator.createMesh( "B E Y O N D" , {
    size: .1
  });

  title.material.opacity = 0;

  quote = textCreator.createMesh( quoteText );


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

    scene.add( this );
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
