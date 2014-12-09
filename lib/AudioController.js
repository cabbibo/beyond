
function AudioController(){

  try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
  }catch(e) {
    alert( 'WEB AUDIO API NOT SUPPORTED' );
  }
 
  this.ctx      = new AudioContext();

  this.mute = this.ctx.createGain();
  this.gain     = this.ctx.createGain();
  this.analyzer = this.ctx.createAnalyser();

  this.analyzer.frequencyBinCount = 1024;
  this.analyzer.array = new Uint8Array( this.analyzer.frequencyBinCount );

  this.texture = AudioTexture( this );
  
  this.gain.connect( this.analyzer );
  this.analyzer.connect( this.mute );
  this.mute.connect( this.ctx.destination );


  this.notes = [];

}


AudioController.prototype.update = function(){

  this.analyzer.getByteFrequencyData( this.analyzer.array );

  this.texture.update();
  for( var i = 0; i < this.notes.length; i++ ){

    this.notes[i].update();

  }

}


