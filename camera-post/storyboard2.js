var flakeStoryline = parseStoryline( {

	flake1a: [
		'0 cut to .3433',
		'30 ease to -1.123'
	],

	flake2a: [
		'27 cut to 1.3433',
		'40 ease to 3.123'
	],

	flake3a: [
		'35 cut to 2.3433',
		'60 ease to 4.123'
	],

	flake4a: [
		'50 cut to 2.3433',
		'60 ease to 1.123',
		'60 cut to -1.123',
		'80 ease to 2.123'
	],
	
	flake5a: [
		'70 cut to .3433',
		'107 ease to -5.123'
	]

} );

var effectsStoryline = parseStoryline( {

	fade: [
		'0 cut to 1',
		'11 ease to 1',
		'14 ease to 0',
		
		'15 cut to 0',
		'17 ease to 1',
		'19 ease to 0',
		
		'26 cut to 0',
		'27 ease to 1',
		'28 ease to 0',

		'29 cut to 0',
		'30 ease to 1',
		'31 ease to 0',

		'36 cut to 0',
		'37 ease to 1',
		'38 ease to 0',

		'43.5 cut to 0',
		'44.5 ease to 1',
		'45.5 ease to 0',

		'47 cut to 0',
		'48 ease to 1',
		'49 ease to 0',

		'53 cut to 0',
		'54 ease to 1',
		'55 ease to 0',

		'59 cut to 0',
		'60 ease to 1',
		'61 ease to 0',

		'65 cut to 0',
		'66 ease to 1',
		'67 ease to 0',

		'68.5 cut to 0',
		'69.5 ease to 1',
		'70.5 ease to 0',

		'74 cut to 0',
		'75 ease to 1',
		'76 ease to 0',

		'106 cut to 0',
		'107 ease to 1'
	]

} );

var cameraStoryline = parseStoryline( {
	
	x: [
		'0 cut to 0',
		'97 ease to 0'
	],

	y: [
		'0 cut to -1400',
		'11 cut to -800',
		'97 linear to 750',
		'107 linear to 900'
	],

	z: [
		'0 cut to 0',
		'97 ease to 0'
	],
	
	targetx: [
		'0 cut to 20',
		'97 ease to 20',
	],

	targety: [
		'0 cut to -820',
		'11 cut to -820',
		'97 linear to 800',
		'107 linear to 1000'
	],

	targetz: [
		'0 cut to 50',
		'97 ease to 50',
	],
	
	cutx: [
		'17 cut to -10',
		'27 linear to 15',
		'30 cut to 0',
		'37 ease to 0',

		'37 cut to -10',
		'44.5 ease to -10',
		'44.5 cut to -10',
		'48 linear to -10',
		
		'54 cut to -10',
		'66 ease to 10',

		'69.5 cut to -50',
		'75 ease to -60',

		'75 cut to 0',
		'90 ease to 0',

		'90 cut to 0',
		'107 ease to 0',
	],

	cuty: [
		'17 cut to -750',
		'27 ease to -750',
		'27 cut to -500',
		'30 ease to -375',
		'30 cut to -375',
		'37 ease to -375',

		'37 cut to 0',
		'44.5 ease to 10',
		'44.5 cut to -20',
		'48 linear to 20',

		'54 cut to 375',
		'66 ease to 375',

		'69.5 cut to 355',
		'75 linear to 395',

		'75 cut to 750',
		'90 ease to 750',

		'90 cut to 750',
		'107 ease to 1000',
	],

	cutz: [
		'17 cut to -50',
		'27 linear to 0',
		'30 cut to 0',
		'37 ease to -100',

		'37 cut to -10',
		'44.5 ease to -80',
		'44.5 cut to 60',
		'48 linear to 80',

		'54 cut to 80',
		'60 ease to 80',
		'60 cut to 30',
		'62 ease to 40',
		'66 ease to 0',
		'66 cut to 40',
		'66 ease to -20',

		'69.5 cut to 40',
		'75 ease to 50',

		'75 cut to 100',
		'90 linear to -50',
		
		'107 ease to 0',
	],

	targetcutx: [
		
		'17 cut to -10',
		'27 linear to 10',
		'30 cut to 0',
		'37 ease to 0',

		'37 cut to 0',
		'44.5 ease to 0',
		'44.5 cut to 0',
		'48 ease to 0',

		'54 cut to -10',
		'66 ease to 10',

		'69.5 cut to 0',
		'75 ease to 0',

		'75 cut to 0',
		'90 ease to 0',

		'90 cut to 0',
		'107 ease to 0',
	],

	targetcuty: [
		'17 cut to -750',
		'27 ease to -750',
		'27 cut to -500',
		'30 ease to -375',
		'30 cut to -365',
		'37 ease to -385',

		'37 cut to 0',
		'44.5 ease to 10',
		'44.5 cut to -20',
		'48 linear to 20',

		'54 cut to 375',
		'66 ease to 375',

		'69.5 cut to 355',
		'75 linear to 395',
		
		'75 cut to 750',
		'90 ease to 750',

		'90 cut to 750',
		'107 ease to 1300',
	],

	targetcutz: [
		'17 cut to 100',
		'27 linear to 100',
		'30 cut to 100',
		'37 ease to 100',

		'37 cut to 100',
		'44.5 ease to 100',
		'44.5 cut to 100',
		'48 ease to 100',

		'54 cut to 100',
		'66 ease to 100',

		'69.5 cut to 100',
		'75 ease to 100',

		'75 cut to 100',
		'90 ease to 100',

		'90 cut to 100',
		'107 ease to 100',
	],

} );