/*
 
   X & Y positions gives UV lookup, while Z position
   tells us if we are offset or not

*/
function createHexGridGeometry(size ){

  s2 = size * size;
  var positions   = new Float32Array( s2 * 3 * 6 );
  var normals     = new Float32Array( s2 * 3 * 6 );
  //var positions2  = new Float32Array( s2 * 3 * 6 );
  //var displacment = new Float32Array[ s2 ];


  var geo = new THREE.BufferGeometry();
  var aPos = new THREE.BufferAttribute( positions , 3 );
  var aNorm = new THREE.BufferAttribute( normals , 3 );
 // var aPos1 = new THREE.BufferAttribute( positions1 , 3 );
 // var aPos2 = new THREE.BufferAttribute( positions2 , 3 );
  
  geo.addAttribute( 'position' , aPos ); 
  geo.addAttribute( 'normal' , aNorm ); 
  
  for( var i =0; i < size; i++ ){
    for( var j = 0; j < size; j++ ){

      var id = i * size + j;
      var index = id * 6;

      var v1 , v2 , v3 , v4;

      var d = j % 2 , d1 = (j+1) % 2
      v1 = [  i    / size ,  j    / size , j % 2 ];
      v2 = [ (i+1) / size ,  j    / size , j % 2 ];
      v3 = [  i    / size , (j+1) / size , (j+1) % 2 ];
      v4 = [ (i+1) / size , (j+1) / size , (j+1) % 2 ];

      if( (j % 2 == 1) ){
        // Triangle 1
        positions[ index * 3 + 0  ] = v2[0]; 
        positions[ index * 3 + 1  ] = v2[1]; 
        positions[ index * 3 + 2  ] = v2[2];
        
        positions[ index * 3 + 3  ] = v3[0]; 
        positions[ index * 3 + 4  ] = v3[1]; 
        positions[ index * 3 + 5  ] = v3[2];
       
        positions[ index * 3 + 6  ] = v1[0]; 
        positions[ index * 3 + 7  ] = v1[1]; 
        positions[ index * 3 + 8  ] = v1[2];

        // Triangle 2
        positions[ index * 3 + 9  ] = v2[0]; 
        positions[ index * 3 + 10 ] = v2[1]; 
        positions[ index * 3 + 11 ] = v2[2];
        
        positions[ index * 3 + 12 ] = v4[0]; 
        positions[ index * 3 + 13 ] = v4[1]; 
        positions[ index * 3 + 14 ] = v4[2];
       
        positions[ index * 3 + 15 ] = v3[0]; 
        positions[ index * 3 + 16 ] = v3[1]; 
        positions[ index * 3 + 17 ] = v3[2];

        

      
      }else{

        // Triangle 1
        positions[ index * 3 + 0  ] = v1[0]; 
        positions[ index * 3 + 1  ] = v1[1]; 
        positions[ index * 3 + 2  ] = v1[2];
        
        positions[ index * 3 + 3  ] = v4[0]; 
        positions[ index * 3 + 4  ] = v4[1]; 
        positions[ index * 3 + 5  ] = v4[2];
       
        positions[ index * 3 + 6  ] = v3[0]; 
        positions[ index * 3 + 7  ] = v3[1]; 
        positions[ index * 3 + 8  ] = v3[2];

        // Triangle 2
        positions[ index * 3 + 9  ] = v2[0]; 
        positions[ index * 3 + 10 ] = v2[1]; 
        positions[ index * 3 + 11 ] = v2[2];
       
        positions[ index * 3 + 12 ] = v4[0]; 
        positions[ index * 3 + 13 ] = v4[1]; 
        positions[ index * 3 + 14 ] = v4[2];
        
        positions[ index * 3 + 15 ] = v1[0]; 
        positions[ index * 3 + 16 ] = v1[1]; 
        positions[ index * 3 + 17 ] = v1[2];



      }

    }
  }

  return geo; 

}


function createHexGridLineGeometry(size ){

  s2 = size * size;
  var positions   = new Float32Array( s2 * 3 * 12 );
  var normals     = new Float32Array( s2 * 3 * 12 );
  //var positions2  = new Float32Array( s2 * 3 * 6 );
  //var displacment = new Float32Array[ s2 ];


  var geo = new THREE.BufferGeometry();
  var aPos = new THREE.BufferAttribute( positions , 3 );
  var aNorm = new THREE.BufferAttribute( normals , 3 );
 // var aPos1 = new THREE.BufferAttribute( positions1 , 3 );
 // var aPos2 = new THREE.BufferAttribute( positions2 , 3 );
  
  geo.addAttribute( 'position' , aPos ); 
  geo.addAttribute( 'normal' , aNorm ); 
  
  for( var i =0; i < size; i++ ){
    for( var j = 0; j < size; j++ ){

      var id = i * size + j;
      var index = id * 12;

      var v1 , v2 , v3 , v4;

      var d = j % 2 , d1 = (j+1) % 2
      v1 = [  i    / size ,  j    / size , j % 2 ];
      v2 = [ (i+1) / size ,  j    / size , j % 2 ];
      v3 = [  i    / size , (j+1) / size , (j+1) % 2 ];
      v4 = [ (i+1) / size , (j+1) / size , (j+1) % 2 ];

    if( (j % 2 == 1) ){
      // Triangle 1
      //
      //
      
      positions[ index * 3 + 0  ] = v2[0]; 
      positions[ index * 3 + 1  ] = v2[1]; 
      positions[ index * 3 + 2  ] = v2[2];
           
      positions[ index * 3 + 3  ] = v3[0]; 
      positions[ index * 3 + 4  ] = v3[1]; 
      positions[ index * 3 + 5  ] = v3[2];

      positions[ index * 3 + 6  ] = v3[0]; 
      positions[ index * 3 + 7  ] = v3[1]; 
      positions[ index * 3 + 8  ] = v3[2];

      positions[ index * 3 + 9  ] = v1[0]; 
      positions[ index * 3 + 10  ] = v1[1]; 
      positions[ index * 3 + 11  ] = v1[2];

      positions[ index * 3 + 12  ] = v1[0]; 
      positions[ index * 3 + 13  ] = v1[1]; 
      positions[ index * 3 + 14  ] = v1[2];
      
      positions[ index * 3 + 15  ] = v2[0]; 
      positions[ index * 3 + 16  ] = v2[1]; 
      positions[ index * 3 + 17  ] = v2[2];
     

      // Triangle 2
      
      positions[ index * 3 + 18 ] = v2[0]; 
      positions[ index * 3 + 19 ] = v2[1]; 
      positions[ index * 3 + 20 ] = v2[2];
     
      positions[ index * 3 + 21 ] = v4[0]; 
      positions[ index * 3 + 22 ] = v4[1]; 
      positions[ index * 3 + 23 ] = v4[2];
     
      positions[ index * 3 + 24 ] = v4[0]; 
      positions[ index * 3 + 25 ] = v4[1]; 
      positions[ index * 3 + 26 ] = v4[2];

      positions[ index * 3 + 27 ] = v3[0]; 
      positions[ index * 3 + 28 ] = v3[1]; 
      positions[ index * 3 + 29 ] = v3[2];

      positions[ index * 3 + 30 ] = v3[0]; 
      positions[ index * 3 + 31 ] = v3[1]; 
      positions[ index * 3 + 32 ] = v3[2];

      positions[ index * 3 + 33 ] = v2[0]; 
      positions[ index * 3 + 34 ] = v2[1]; 
      positions[ index * 3 + 35 ] = v2[2];

      
     

    }else{
      
      
      positions[ index * 3 + 0  ] = v1[0]; 
      positions[ index * 3 + 1  ] = v1[1]; 
      positions[ index * 3 + 2  ] = v1[2];
           
      positions[ index * 3 + 3  ] = v4[0]; 
      positions[ index * 3 + 4  ] = v4[1]; 
      positions[ index * 3 + 5  ] = v4[2];

      positions[ index * 3 + 6  ] = v4[0]; 
      positions[ index * 3 + 7  ] = v4[1]; 
      positions[ index * 3 + 8  ] = v4[2];

      positions[ index * 3 + 9  ] = v3[0]; 
      positions[ index * 3 + 10  ] = v3[1]; 
      positions[ index * 3 + 11  ] = v3[2];

      positions[ index * 3 + 12  ] = v3[0]; 
      positions[ index * 3 + 13  ] = v3[1]; 
      positions[ index * 3 + 14  ] = v3[2];
      
      positions[ index * 3 + 15  ] = v1[0]; 
      positions[ index * 3 + 16  ] = v1[1]; 
      positions[ index * 3 + 17  ] = v1[2];
     

      // Triangle 2
      
      positions[ index * 3 + 18 ] = v4[0]; 
      positions[ index * 3 + 19 ] = v4[1]; 
      positions[ index * 3 + 20 ] = v4[2];
     
      positions[ index * 3 + 21 ] = v2[0]; 
      positions[ index * 3 + 22 ] = v2[1]; 
      positions[ index * 3 + 23 ] = v2[2];

      positions[ index * 3 + 24 ] = v2[0]; 
      positions[ index * 3 + 25 ] = v2[1]; 
      positions[ index * 3 + 26 ] = v2[2];

      positions[ index * 3 + 27 ] = v1[0]; 
      positions[ index * 3 + 28 ] = v1[1]; 
      positions[ index * 3 + 29 ] = v1[2];

      positions[ index * 3 + 30 ] = v1[0]; 
      positions[ index * 3 + 31 ] = v1[1]; 
      positions[ index * 3 + 32 ] = v1[2];

      positions[ index * 3 + 33 ] = v4[0]; 
      positions[ index * 3 + 34 ] = v4[1]; 
      positions[ index * 3 + 35 ] = v4[2];



    }
     
      
      
     

    }
  }

  return geo; 

}
