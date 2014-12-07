function ObjectControls(eye){

  addListener( 'mousedown', this.mouseDown.bind( this )  , false );
  addListener( 'mouseup'  , this.mouseUp.bind( this )    , false );
  addListener( 'mousemove', this.mouseMove.bind( this )  , false );


}
