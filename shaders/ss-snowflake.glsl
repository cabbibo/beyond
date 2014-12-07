

const float size = @SIZE;

uniform sampler2D t_pos;
uniform sampler2D t_oPos;
uniform sampler2D t_og;
uniform sampler2D t_block;

uniform float time;
uniform float dT;
uniform sampler2D t_audio;

varying vec2 vUv;

const float pi =3.14159;
const float pi2 = 2. * pi;

float rand( vec2 u ){
  return abs(sin( 7532.51 * sin( u.x * 19123333.33 ) * cos( u.y * 11326.1421 ) ));
}


vec2 newUV( vec2 uv , float a ){

  vec2 nUV = uv;
  vec2 b = vec2( cos( a ) , sin( a ) ) * size; 

  nUV -= b * 1.;

  return nUV;

}

vec4 nPos( sampler2D t , vec2 uv , float a ){

  vec2 nUV = newUV( uv , a );
  vec4 p;
  if( nUV.x < 0. || nUV.x > 1. || nUV.y < 0. || nUV.y > 1. ){
    p = texture2D( t , uv );
  }else{
    p = texture2D( t , nUV );
  }

  
  return p;
 
}

float getSideValue( float a[6] ){
  int c = int( abs(sin( time)) * 6. );

  float w = 0.;

  if( c == 0 ){
    w = a[0];
  }else if( c == 1 ){
    w = a[1];
  }else if( c == 2 ){
    w = a[2];
  }else if( c == 3 ){
    w = a[3];
  }else if( c == 4 ){
    w = a[4];
  }else if( c == 5 ){
    w = a[5];
  }

  return w;

}

float getSideValue( float a[6] , int c){

  float w = 0.;

  if( c == 0 ){
    w = a[0];
  }else if( c == 1 ){
    w = a[1];
  }else if( c == 2 ){
    w = a[2];
  }else if( c == 3 ){
    w = a[3];
  }else if( c == 4 ){
    w = a[4];
  }else if( c == 5 ){
    w = a[5];
  }

  return w;

}



void main(){

  vec4 pos = texture2D( t_pos , vUv );
 // vec4 oPos = texture2D( t_oPos , vUv );
  vec4 og = texture2D( t_og , vUv );
  vec4 block = texture2D( t_block , vUv );

  //pos.a += .002; //*  rand( vUv * (time+1.) * 1000. );

  vec2 cUV = vUv - vec2( .5 , .5 );

  float t =  atan( cUV.y , cUV.x );

//  t = vUv.x + vUv.x;
  
  if( pos.a < 3. ){
  if( length(cUV) < size ){  
      pos = vec4( 1. );
      

  }else{


   

  float dif[6];
  float a[6];

  for( float i = 0. ; i < 6.; i++ ){

    float t = pi2 * (i-3.)/6.;
    vec4 d = nPos( t_pos , vUv ,t );
    a[int(i)] = d.r;
    dif[int(i)] = abs(d.r - pos.r);

  }
  
  if( pos.g < 1. ){

   // t =  mod( t+(pi/2.),  1. );
   
    float dif = 1000.;
    for( float i = 0. ; i < 6.; i++ ){

        float a = pi2 * i/6.;
        dif = min( dif , abs( sin(a)-sin(( t + pi)) ) );
  
    }
 
//    if( dif > .001 ){

      float v =  getSideValue( a , int(  (t + pi)/pi2* 6. ));
      if( abs(v - pos.r) > .001 ){

        pos.r = min( 1. , pos.r+ min( .6 , v ));
        pos.g = 1.;

      }

  //  }

  }else{

      if( pos.g < 1.5 && pos.a < 2.4 ){
        if( 
          dif[0] < .4 &&
          dif[1] < .4 &&
          dif[2] < .4 &&
          dif[3] < .4 &&
          dif[4] < .4 &&
          dif[5] < .4 
        ){

          pos.r += .01; //getSideValue( a );
          pos.g += .001;
        }

      }else{

        if( pos.a < .2 ){

          pos.b = time;

        }

      }

    }

}
  
}

pos.a += dT;
  gl_FragColor =  pos;//vec4( 1. );


}
