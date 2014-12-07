
const int size = @SIZE;

uniform sampler2D t_depth;
varying vec3 vNorm;
varying vec4 vData;
varying vec3 vCol;

$canUse
$getFunctions

void main(){


 
 // vec4 depth = texture2D( t_depth , position.xy );   

  vData = texture2D( t_depth , position.xy );

  vec3 pos = getXYZPos( t_depth, position );

  float iSize = 1./float( size );
  vec3 sR = position + vec3( iSize , 0. , 0. ); 
  vec3 sL = position - vec3( iSize , 0. , 0. );

  float row = mod( float( size ) * position.y , 2. );


  vec3 sUR = position;
  vec3 sUL = position;
  vec3 sDR = position;
  vec3 sDL = position; 
 
  if( row > .5 ){

    sUR.x += 0.;
    sUR.y += iSize;
    sUR.z  = 0.;

    sUL.x -= iSize;
    sUL.y += iSize;
    sUL.z  = 0.;
    
    sDR.x += 0.;
    sDR.y -= iSize;
    sDR.z  = 0.;

    sDL.x -= iSize;
    sDL.y -= iSize;
    sDL.z  = 0.;

  }else{

    sUR.x += iSize;
    sUR.y += iSize;
    sUR.z  = 1.;

    sUL.x += 0.;
    sUL.y += iSize;
    sUL.z  = 1.;
    
    sDR.x += iSize;
    sDR.y -= iSize;
    sDR.z  = 1.;

    sDL.x += 0.;
    sDL.y -= iSize;
    sDL.z  = 1.;


  }



  // Checking to make sure we can sample in all directions

  float usable = canUse( sUR.xy , sUL.xy , sDR.xy , sDL.xy , sL.xy , sR.xy );
  

  vCol = vec3( 0. );

  if( usable < .5 ){

    vCol = vec3( 1. );
    vNorm = vec3( 0. , 0. , 1. );

  }else{


    vec3 uR = getXYZPos( t_depth , sUR );
    vec3 uL = getXYZPos( t_depth , sUL );
    vec3 dR = getXYZPos( t_depth , sDR );
    vec3 dL = getXYZPos( t_depth , sDL );
    vec3 r  = getXYZPos( t_depth , sR  ); 
    vec3 l  = getXYZPos( t_depth , sL  ); 

    vec3 norm = vec3( 0. );
   
    vec3 f1 = normalize(cross( ( pos - uR ) , ( pos- uL ) ));
    vec3 f2 = normalize(cross( ( pos - uL ) , ( pos- l  ) ));
    vec3 f3 = normalize(cross( ( pos - l  ) , ( pos- dL ) ));
    vec3 f4 = normalize(cross( ( pos - dL ) , ( pos- dR ) ));
    vec3 f5 = normalize(cross( ( pos - dR ) , ( pos- r  ) ));
    vec3 f6 = normalize(cross( ( pos - r  ) , ( pos- uR ) ));

    norm += f1; 
    norm += f2; 
    norm += f3; 
    norm += f4; 
    norm += f5; 
    norm += f6; 


    //vCol = vec3( 0. );
    vNorm = normalize( norm );

  }


 // pos.z = 0.;

  // Gets our position centered x
 // pos.x = position.x - .5;
 // pos.y = (position.y - .5); //* sqrt( 3. ) / 2.;

 // pos.x -=  ((1. / float( size ))) * position.z * .5;

  //vCol = vec3(  position.z *mod( float( size ) * position.x , 2. ) );
  /*vCol = vec3(  mod( float( size ) * position.y , 2. ) *mod( float( size ) * position.x , 2. ) );

  vCol.z = position.z;
  vCol.x = mod( float( size ) * position.x , 2. );
  vCol.y = mod( float( size ) * position.y , 2. );*/

  // the vert where the value of y is 0 and x is 1 is to the right
  // of where the value of y is 1 and the value of x is 1

  //vCol.x = vec3( mod( float( size ) * position.x , 2. ) );
  //vCol.y = vec3( mod( float( size ) * position.y , 2. ) );

  /* vCol.z = position.z *mod( float( size ) * position.x , 2. ) ;
  vCol.x = 0.;// mod( float( size ) * position.x , 2. );
  vCol.y = 0.;*/


  //gl_PointSize=10.;/// length(vec3(modelMatrix * vec4( pos.xyz , 1. )).xyz);
 

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos.xyz , 1. );
  //gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1. );


}
