var ACTIONS = {
	CUT: 0,
	EASE: 1,
	LINEAR: 2
}

function Event() {
	this.start = null;
	this.end = null;
	this.action = null;
	this.from = 0;
	this.to = 0;
	this.duration = 0;
}

function parseStoryline( story ) {

	var result = {};

	for( var v in story ) {
		if( story.hasOwnProperty( v ) ) {

			var storyboard = [];

			story[ v ].forEach( function( e ) {
				var start = e.match( /([^\s]+)/ );
				var event = new Event();
				if( e.indexOf( 'cut to' ) != -1 ) {
					event.start = parseFloat( start[ 1 ] );
					event.end = event.start;
					event.action = ACTIONS.CUT;
					var v = e.match( /[^\s]+ cut to ([^\s]+)/ );
					event.from = parseFloat( v[ 1 ] );
					event.to = event.from;
				}
				if( e.indexOf( 'ease to' ) != -1 ) {
					event.end = parseFloat( start[ 1 ] );
					event.action = ACTIONS.EASE;
					event.from = 0;
					var v = e.match( /[^\s]+ ease to ([^\s]+)/ );
					event.to = parseFloat( v[ 1 ] );
				}
				if( e.indexOf( 'linear to' ) != -1 ) {
					event.end = parseFloat( start[ 1 ] );
					event.action = ACTIONS.LINEAR;
					event.from = 0;
					var v = e.match( /[^\s]+ linear to ([^\s]+)/ );
					event.to = parseFloat( v[ 1 ] );
				}
				storyboard.push( event );
			} );

			storyboard.forEach( function( e, i ) {
				if( e.action === ACTIONS.EASE || e.action == ACTIONS.LINEAR ) {
					e.start = storyboard[ i - 1 ].end;
					e.from = storyboard[ i - 1 ].to;
				}
				e.duration = e.end - e.start;
			} );

			storyboard.forEach( function( e, i ) {
				//console.log( e.from + '(' + e.start + ')' + ' to ' + e.to + '(' + e.end + ') in ' + e.duration );
			} );

			result[ v ] = storyboard;

		}
	}

	return result;

}
	
function getPointInStoryline( storyline, t, value ) {
	
	if( !storyline[ value ] ) return null;

	for( var j = 0; j < storyline[ value ].length; j++ ) {
		var e = storyline[ value ][ j ];
		if( e.start <= t && e.end > t ) {
			return e;
		}
	}

	return null;

}

function averageData( story, t, value ) {

	var p = getPointInStoryline( story, t, value );

	if( !p ) return null;

	if( p.action === ACTIONS.CUT ) {
		return p.from;
	}

	if( p.action === ACTIONS.EASE ) {
	
		var et = ( t - p.start ) / p.duration;
		var easing;
		if ( ( et *= 2 ) < 1 ) easing = 0.5 * et * et;
		else easing = - 0.5 * ( --et * ( et - 2 ) - 1 );

		var v = p.from + ( easing * ( p.to - p.from ) );

		return v;

	}

	if( p.action === ACTIONS.LINEAR ) {
	
		var et = ( t - p.start ) / p.duration;
		var v = p.from + ( et * ( p.to - p.from ) );

		return v;

	}

}

function setValue( original, value ) {

	if( value !== null ) return value;
	return original

}

function updateStory( t ) {
	
	for( var j = 0; j < flakes.length; j++ ) {

      var f = flakes[ j ];

      //console.log( flakes[j] );
		f.body.position.x = averageData( flakeStoryline, t, 'flake' + ( j + 1 ) + 'x' ) || f.body.position.x;
		f.body.position.y = averageData( flakeStoryline, t, 'flake' + ( j + 1 ) + 'y' ) || f.body.position.y;
		f.body.position.z = averageData( flakeStoryline, t, 'flake' + ( j + 1 ) + 'z' ) || f.body.position.z;
		f.body.rotation.z = averageData( flakeStoryline, t, 'flake' + ( j + 1 ) + 'a' ) || f.body.rotation.z;
	

      

        console.log( averageData( simulationStoryline, t,'flake' + ( j + 1 ) ) );
        
        var active =   averageData( simulationStoryline, t,'flake' + ( j + 1 ) ) || 0;

        if( active > .5 ){

          console.log( 'ACTIVE' );
          f.active = true;


        }else{

          f.active = false;

        }
        
        // var isActive averageData( flakeStoryline, t, 'flake' + ( j + 1 ) + 'ACT' )

        
      //  flakes[ j ].rotation.z = averageData( flakeStoryline, t, 'flake' + ( j + 1 ) + 'a' ) || flakes[ j ].rotation.z;
	}

	camera.position.x = setValue( camera.position.x, averageData( cameraStoryline, t, 'x' ) );
	camera.position.y = setValue( camera.position.y, averageData( cameraStoryline, t, 'y' ) );
	camera.position.z = setValue( camera.position.z, averageData( cameraStoryline, t, 'z' ) );

	camera.position.x = setValue( camera.position.x, averageData( cameraStoryline, t, 'cutx' ) );
	camera.position.y = setValue( camera.position.y, averageData( cameraStoryline, t, 'cuty' ) );
	camera.position.z = setValue( camera.position.z, averageData( cameraStoryline, t, 'cutz' ) );

	camera.target.x = setValue( camera.target.x, averageData( cameraStoryline, t, 'targetx' ) );
	camera.target.y = setValue( camera.target.y, averageData( cameraStoryline, t, 'targety' ) );
	camera.target.z = setValue( camera.target.z, averageData( cameraStoryline, t, 'targetz' ) );

	camera.target.x = setValue( camera.target.x, averageData( cameraStoryline, t, 'targetcutx' ) );
	camera.target.y = setValue( camera.target.y, averageData( cameraStoryline, t, 'targetcuty' ) );
	camera.target.z = setValue( camera.target.z, averageData( cameraStoryline, t, 'targetcutz' ) );

	fade.style.opacity = setValue( fade.style.opacity, averageData( effectsStoryline, t, 'fade' ) );

	//console.log( averageData( simulationStoryline, t, 'flake1' ) );

}
