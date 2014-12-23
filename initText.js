


function initText( quoteText ){


  title = textCreator.createMesh( "B E Y O N D" , {
    size: .1,
    type:"20pt GeoSans",
    font:"GeoSans"
  });
  title.scale.multiplyScalar( 100. );

  //title.position.y = -900;

  title.position.set( 0 , -900 , 50)

  title.rotation.y = Math.PI;
  scene.add( title );
  //title.material.opacity = 0;


  quote = new THREE.Object3D();

  quote.rotation.y = Math.PI;
  quote.rotation.x = -1.2;

  quote.position.y = 820;
  quote.position.z = 5;
  quote.lines = [];
  
  for( var i = 0; i < quoteText.length; i++ ){

    if( quoteText[i] !== "" ){
      var line =textCreator.createMesh( quoteText[i] , {
        size: .5,
        crispness: 5,
      });

      line.material.blending = THREE.SubtractiveBlending
      line.materialNeedsUpdate = true;
      line.position.y = -1.2* (( (i+.5) / quoteText.length) - .5 )
      quote.add( line );
      quote.lines.push( line );

    }

  }

  scene.add( quote );

  quote.scale.multiplyScalar( 5.3 );

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
