
var MMC_CENTER = new THREE.Vector3();

THREE.MouseMoveControls = function ( object, domElement ) {

      this.object = object;
      this.domElement = ( domElement !== undefined ) ? domElement : document;

      // API

      this.enabled = true;

      this.z = 300;
      this.x = 0;
      this.y = 0;
      this.speed =  .05;
      this.zoomSpeed =  .00001;

      this.mouse = {
        x:0,
        y:0
      }

      this.center = new THREE.Vector3();

      
      this.update = function () {

        if( this.object.position.z > 0 ){
          this.object.position.x += ( ( this.mouse.x - this.object.position.x ) + this.x ) * this.speed;
          this.object.position.y += ( (this.mouse.y - this.object.position.y  ) + this.y ) * this.speed;
        }else{
          this.object.position.x -= ( ( this.mouse.x - this.object.position.x ) + this.x ) * this.speed;
          this.object.position.y -= ( ( this.mouse.y - this.object.position.y ) + this.y ) * this.speed;
        }


        if( this.mouseDown ){

          this.object.position.z -= Math.pow(( this.object.position.z * this.zoomSpeed) , 3 );

        }else{

          this.object.position.z += ( this.z - this.object.position.z  ) * this.zoomSpeed;

        }

        this.object.lookAt( this.center );
         
      };

      this.onMouseMove = function( event ) {

        var x = event.clientX;
        var y = event.clientY;

        var w = window.innerWidth;
        var h = window.innerHeight;

        this.mouse.x = ( x - w/2 );
        this.mouse.y = ( y - h/2 );

      }

      this.onMouseDown = function( event ) {

        this.mouseDown = true;
        
      }

      this.onMouseUp = function( event ) {

        this.mouseDown = false;

      }





      this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
      this.domElement.addEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
      this.domElement.addEventListener( 'mousedown', this.onMouseDown.bind( this ), false );

      this.domElement.addEventListener( 'mouseup', this.onMouseUp.bind( this ), false );

    

  };

  THREE.MouseMoveControls.prototype = Object.create( THREE.EventDispatcher.prototype );
