
// NEEDS TO STOP
const float size = @SIZE;
const float PI = 3.14159265359;
const float PI2 = 2. * PI;

uniform vec2 resolution;

uniform sampler2D t_pos;
uniform sampler2D t_oPos;
uniform sampler2D t_og;

uniform float time;
uniform sampler2D t_audio;

varying vec2 vUv;

$simplex
$canUse
$getCenterPos
$hexNoise

// data.x = level
// data.y = temperature
// data.z = isCrystal

void main(){

  float iSize = 1. / size;

  vec2 uv = gl_FragCoord.xy / resolution ;
  vec4 pos = texture2D( t_pos , uv );



  vec2 modVec[6];


  modVec[0] = vec2( iSize , 0. );
  modVec[3] = vec2( -iSize , 0. );


  vec2 sR = uv + vec2( iSize , 0. );
  vec2 sL = uv - vec2( iSize , 0. );

  vec2 sUR = uv;
  vec2 sUL = uv;
  vec2 sDR = uv;
  vec2 sDL = uv;

  float row = mod( gl_FragCoord.y , 2. );

   if( row > .5 ){

    sUR.x += 0.;
    sUR.y += iSize;

    sUL.x -= iSize;
    sUL.y += iSize;
    
    sDL.x -= iSize;
    sDL.y -= iSize; 
    
    sDR.x += 0.;
    sDR.y -= iSize;


    modVec[1] = vec2( 0. , iSize );
    modVec[2] = vec2( -iSize , iSize );
    modVec[4] = vec2( -iSize , -iSize );
    modVec[5] = vec2( 0. , -iSize );

    /*modVec[1] = vec2( iSize , iSize );
    modVec[2] = vec2( 0. , iSize );
    modVec[4] = vec2( 0 , -iSize );
    modVec[5] = vec2( iSize , -iSize );*/


  }else{

    sUR.x += iSize;
    sUR.y += iSize;

    sUL.x += 0.;
    sUL.y += iSize;
    
    sDL.x += 0.;
    sDL.y -= iSize;
    
    sDR.x += iSize;
    sDR.y -= iSize;

    modVec[1] = vec2( iSize , iSize );
    modVec[2] = vec2( 0. , iSize );
    modVec[4] = vec2( 0 , -iSize );
    modVec[5] = vec2( iSize , -iSize );

    /*modVec[1] = vec2( 0. , iSize );
    modVec[2] = vec2( -iSize , iSize );
    modVec[4] = vec2( -iSize , -iSize );
    modVec[5] = vec2( 0. , -iSize );*/


  }



  float rand = float( 99. * abs( cos( sin( time * 1000.51612) * cos( time * 10000.12615 ) ) ));

  int rand6 = int( mod( rand , 6. ) );
  vec2 d = uv - vec2( .5+iSize / 2. );
    

  // Sets our 'seed' 
  // of the crystal
  if( length(d) < iSize * .1 ){

    pos.x = 1.;
    pos.y = .0;
    pos.z = 1.;
    pos.a = -.1;

  }

  float t = atan( d.y , d.x ) + 3.14159;
  float r = length( d );

  float tA = PI * 2. / 6.;

  float tDif = abs(mod( t , tA)-tA*.5);
  //int section = int(mod( t , 3.14159 * (2./6.) ));

  float sec = mod( t , PI * 2. );
  sec /= 2. * PI;
  sec *= 6.;
  int section = int( sec );

  // Build a basis for the section we are in
  
  float lowAngle = float(section) * PI2 / 6.;
  float centerAngle = lowAngle + (.5 * PI2 / 6.);
  
  
  vec2 yBasis = vec2( cos( centerAngle ) , sin( centerAngle ));
  vec2 xBasis = vec2( -sin( centerAngle ) , cos( centerAngle ) );
  
 
  vec2 v = d;
      
  vec2 s = yBasis;
  float yAmount = dot( v , s ) / dot( s , s );
  
  s = xBasis;
  float xAmount = dot( v , s ) / dot( s , s );

  float sim = 1.;
  vec2 pHex = vec2( xAmount , -yAmount );
 
  vec2 pCenter = getCenterPos( pHex * vec2( .69282 , 1. ) * vec2( 14. )  );

  //sim *= hexNoise( pHex , 14. , 8.1 );
  sim *= hexNoise( pHex , 20. , 10.1 ) * length(abs(pHex)-abs(pCenter));// * length(pHex);
  //sim *= pow( hexNoise( pHex , 50. , 4.1 ), 2. );
 // sim += hexNoise( pHex , 100. , 10.1 );
  //sim *= hexNoise( pHex , 25. , 10.1 );

  sim = pow( sim , .4 );// 100.;
  
  //pos.x = sim;
 // lookup = vec2( abs(xAmount*noiseSize*10.) , yAmount* noiseSize*10.);
 // sim += .1 * snoise( lookup ) * (1.- abs(xAmount)*5.);

  // Temperature
  // Level
  // crystalized

  vec4 audio = texture2D( t_audio , vec2( abs(sin(sim * 100.))   , 0.)  );

  // Limits our growth using alpha, and makes sure
  // we don't hit the edge
  if( pos.a > 0. && length( d )  < .5){
    
    float usable = canUse( sUR , sUL , sDR , sDL , sL , sR );
   

    vec2 fromCenter = d;

    // Order for dataPoints ( dP ) is RHR starting at right sample
    if( usable > .5 ){

      vec4 dP[ 6 ];
      vec2 s[ 6 ];

      s[0] = sR; s[1] = sUR; s[2] = sUL; 
      s[3] = sL; s[4] = sDL; s[5] = sDR;

      dP[0] = texture2D( t_pos , s[0] );
      dP[1] = texture2D( t_pos , s[1] );
      dP[2] = texture2D( t_pos , s[2] );
      dP[3] = texture2D( t_pos , s[3] );
      dP[4] = texture2D( t_pos , s[4] );
      dP[5] = texture2D( t_pos , s[5] );
    

      // Part of crystal
      if( pos.z > .5 ){

        float hexL = length(abs(pHex)-abs(pCenter));
        vec4 audio2 = texture2D( t_audio , vec2( abs(sin( hexL ))  , 0.)  );
       // audio2 *= texture2D( t_audio , vec2( abs( abs(yAmount) * 10. ) , 0.)  );
        
        //pos.x +=  length(audio2) * .1 *( 1. / (tDif+.5));
        pos.x += length( audio2 ); //* (abs(xAmount ) + ( 1. -tDif)) ;//pow( abs( xAmount ) , 10.);/// length( audio );// (1. +  length( audio2 ) *.1 *( 1. / (xAmount+.5)))/2.;
        pos.a -= abs( sim ) * 5.;
        pos.a -= .1;//pow( length( audio ) , .1 );

      //lonely
      }else{

        for( int i = 0; i < 6; i++ ){

          vec4 data = dP[i];

          if( data.z > .5 ){

            //sim = float(int(sim * 3. )) + .1;
            pos.y -= abs(sim) * 50.;
            //pos.y -=( pow(  length( audio ) , 10. ) + .4);// * length( audio ) * length( audio );// * max( .1 ,  (abs(sim)-2.)) * 10. * (1./(abs(xAmount *10.) +.1)) ;

         //   pos.z += abs( sim );
         //   pos.x += abs( sim );


          pos.a -= sim;


          }

         // if( i == section ){
          // Cool down based on neighboring temp
         // pos.y -= pow( length( audio ), 10. ) * data.z * .2 ; //* .0001 /  length( fromCenter );// / (data.y+.0001 );



       
         
        }


        // If we are less that 0, freeze dat shit
          if( pos.y < 0. ){

            pos.z += 1.;
            //pos.x += 0.;//length( audio ) / 10.;//abs(sim);


          }

        pos.a -= abs( sim ) * abs( xAmount ) * 2.3;
       /// pos.a -= pow( abs(xAmount) , 3. ) * 1000.;// * .01* pow(length( audio ), 10. );//* .01 + abs( xAmount * xAmount * xAmount  * .0001) *  1.5;

       // pos.a -= length( d ) * length( d ) * .1;





      }
   

    }

  }

  //pos.x = sim * 10.;
  gl_FragColor = pos;


}

