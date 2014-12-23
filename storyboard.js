var flakeStoryline = parseStoryline( {

/*	flake1a: [
		'0 cut to .3433',
		'30 ease to -5.123'
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
		'65 ease to -1.123',
		'66 cut to -1.123',
		'80 ease to 2.123'
	],
	
	flake5a: [
		'70 cut to .3433',
		'107 ease to -5.123'
	]*/

} );

var simulationStoryline = parseStoryline( {

    flake1: [
		'11.9 cut to 1',
		'39.1 linear to 1',
		'39.1 cut to 0',
		'107 linear to 0'
	],

    flake2: [
        '0 cut to 0',
        '39.1 linear to 0',
		'39.1 cut to 1',
		'59.74 linear to 1',
		'59.74 cut to 0',
		'107 linear to 0'
	],

    flake3: [
        '0 cut to 0',
        '59.74 linear to 0',
		'59.74 cut to 1',
		'66.42 linear to 1',
		'66.42 cut to 0',
		'107 linear to 0'
	],

    flake4: [
        '0 cut to 0',
        '66.42 linear to 0',
		'66.42 cut to 1',
		'79.8 linear to 1',
		'79.8 cut to 0',
		'107 linear to 0'
	],

    flake5: [
        '0 cut to 0',
        '79.8 linear to 0',
		'79.8 cut to 1',
		'91.70 linear to 1',
		'91.70 cut to 0',

		//'107 linear to 0'
	],



/*	flake1: [
		'0 cut to 1',
        '30 cut to 0'
	],

    flake2: [
		'27 cut to 1',
        '40 cut to 0'
	],

    flake3: [
		'35 cut to 1',
        '60 cut to 0'
	],

    flake4: [
		'50 cut to 1',
        '80 cut to 0'
	],

    flake5: [
		'70 cut to 1',
        '107 cut to 0'
	],*/


} );

var effectsStoryline = parseStoryline( {

	fade: [
		'0 cut to 1',
        //'14 linear to 1'
	  	'1 ease to 1',
		'5 ease to 0',

		//'106 ease to 0',
		//'107 ease to 1'
	]

} );

var cameraStoryline = parseStoryline( {

/*
 

  SNOWFLAKE 1

  11.9 --> Audio starts
  16.95
  23.7
  26.3
  29.75
  32.55
  37.34 // Begin Transition to next section ( flow up )
  39.1  // Cut to next section

  

  SNOWFLAKE 2
  42.48 //ech yo
  49.35


  53.48 // begin transition

  SNOWFLAKE 3
  59.74 // CAME FROM
  64.73



  SNOWFLAKE 4
  66.42 // last section start
  73.4


  // SNOWFLAKE 5
  79.8 // Last snowflake zoom start

  86.93 // Final hit 1
  88.73 // final hit 2


  91.70 // Head up!
  107 // music ends

  */
	x: [
		'0 cut to 0',

        '0 cut to 0',
        '6 ease to 4',
        '10 ease to 2',
        '11.9 ease to -1',
        '11.9 cut to 1',
        '16.95 ease to 3',
        '16.95 cut to 0',
        '23.7 ease to -1',
        '23.7 cut to -1',

        '26.3 ease to 0',
        //'26.3  -755',
        '37.32 ease to 1',
        '37.34 cut to 1.2',
        '39.1 ease to 2.', 

        '39.1 cut to -1.',
        '46.5 ease to -2.',
        '46.5 cut to 2.',
        '49.3 ease to 3',

        '59.74 ease to -2',
        //'59.74 cut to -4',


        '66.42 cut to -4',
        '73.4 ease to -3',

        '73.4 cut to 2',
        '79.8 ease to -4',

        '79.8 cut to 0',
        '91.70 ease to 0',

		'97 ease to 0'
	],

	y: [
		'0 cut to -920',
        '6 ease to -900',
        '10 ease to -890',
        '11.9 ease to -880',
        '11.9 cut to -750',
        '16.95 ease to -745',
        '16.95 cut to -750',
        '23.7 ease to -740',
        '23.7 ease to -750',

        '26.3 cut to -750',
        //'26.3  -755',
        '37.32 ease to -755',
        '37.34 cut to -750',
        '39.1 ease to -748', 


        '39.1 cut to -370',
        '59.74 ease to -380',


        '59.74 cut to -5',
        '66.42 ease to 0',


        '66.42 cut to 380',
        '73.4 ease to 375',

        '73.4 cut to 370',
        '79.8 ease to 372',

        '79.8 cut to 750',
        '91.70 ease to 750',

        '107 ease to 800'
		//'12.4 cut to -800',
		//'97 linear to 750',
		//'107 linear to 900'
	],

	z: [
		'0 cut to -50',
        '11.9 ease to -30',
        //'11.9 ease to 1',
        '11.9 cut to 20',
        '16.95 ease to 30',
        '16.95 cut to 40',
        '23.7 ease to 35',

        '37.34 cut to 20',
        '39.1 ease to 0', 


        '39.1 cut to 20',

        '46.5 linear to 40',

        '79.8 cut to 50',
        '91.70 ease to 20',


		'97 ease to 0'
	],
	
	targetx: [
		'0 cut to 0',
		'97 ease to 0',
	],

	targety: [
		'0 cut to -900',
        '10 linear to -895',
        '11.9 ease to -860',
        '11.9 cut to -750',
        '16.95 ease to -745',
        '16.95 cut to -755',

        '39.1 cut to -375',
        '59.74 ease to -375',

        '59.74 cut to 0',
        '66.42 ease to 0',

        '66.42 cut to 375',
        '79.8 ease to 375',

        
        
        '79.8 cut to 750',
        '91.70 ease to 750',


        //'12.4 linear to -900',
        //'12.4 cut to -700',
        '107 ease to 1000'
		//'11 cut to -820',
		//'97 linear to 800',
		//'107 linear to 1000'
	],

	targetz: [
		'0 cut to 50',
		'97 ease to 50',
	],
	
	/*cutx: [
		'17 cut to -10',
		'19.5 ease to 10',
		'23 cut to 0',
		'24 ease to 5',
		'24 cut to -15',
		'26.5 linear to 15',
		'30 cut to 0',
		'35 ease to 0',

		'42 cut to -10',
		'44.5 ease to -10',
		'44.5 cut to -10',
		'48 ease to -10',
		
		'49.3 cut to 0',
		'51 ease to 0',

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
		'19.5 ease to -720',
		'23 cut to -750',
		'24 ease to -750',
		'24 cut to -750',
		'26.5 ease to -750',
		'27 cut to -500',
		'30 ease to -375',
		'30 cut to -375',
		'35 ease to -375',

		'42 cut to 0',
		'44.5 ease to 10',
		'44.5 cut to -20',
		'48 linear to 20',

		'49.3 cut to 0',
		'51 ease to 0',

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
		'18 ease to -60',
		'19.5 ease to -50',
		'24 cut to 50',
		'26.5 linear to 50',
		'30 cut to 0',
		'30.5 ease to 20',
		'32.5 cut to -80',
		'35 ease to -100',

		'42 cut to -10',
		'44.5 ease to -80',
		'44.5 cut to 40',
		'48 ease to 80',

		'49.3 cut to 0',
		'51 ease to 0',

		'54 cut to 80',
		'60 ease to 80',
		'62 cut to 20',
		'66 ease to 0',
		'66 cut to 40',
		'66 ease to -20',

		'69.5 cut to 40',
		'75 ease to 50',

		'75 cut to 100',
		'87 linear to 10',
		'87 cut to 0',
		'89 ease to 0',
		'89 cut to -50',
		'90 ease to -50',
		
		'107 ease to 0',
	],

	targetcutx: [
		'23 cut to 0',
		'24 ease to 5',

		'24 cut to -10',
		'26.5 linear to 10',
		'30 cut to 0',
		'35 ease to 0',

		'42 cut to 0',
		'44.5 ease to 0',
		'44.5 cut to 0',
		'48 ease to 0',

		'49.3 cut to 0',
		'51 ease to 0',

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
		'19.5 ease to -740',
		'23 cut to -750',
		'24 ease to -750',
		'26.5 ease to -750',
		'27 cut to -500',
		'30 ease to -375',
		'30 cut to -365',
		'35 ease to -385',

		'42 cut to 0',
		'44.5 ease to 10',
		'44.5 cut to -20',
		'48 linear to 20',

		'49.3 cut to 0',
		'51 ease to 0',

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
		'24 cut to 100',
		'26.5 linear to 100',
		'30 cut to 100',
		'35 ease to 100',

		'42 cut to 100',
		'44.5 ease to 100',
		'44.5 cut to 100',
		'48 ease to 100',

		'49.3 cut to 100',
		'51 ease to 10',

		'54 cut to 100',
		'66 ease to 100',

		'69.5 cut to 100',
		'75 ease to 100',

		'75 cut to 100',
		'90 ease to 100',

		'90 cut to 100',
		'107 ease to 100',
	],*/

} );
