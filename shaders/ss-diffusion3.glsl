

const float size = @SIZE;

uniform sampler2D t_pos;
uniform sampler2D t_oPos;
uniform sampler2D t_og;
uniform sampler2D t_block;

uniform float time;
uniform float dT;
uniform sampler2D t_audio;

varying vec2 vUv;

$simplex

float rand( vec2 u ){
  return abs(sin( 7532.51 * sin( u.x * 19123333.33 ) * cos( u.y * 11326.1421 ) ));
}

float getSideValue( float a[8] ){

  int c = int( rand( vUv * time) * 8. );

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
  }else if( c == 6 ){
    w = a[6];
  }else{
    w = a[7];
  }

  return w;

}

float getSideValue( float a[8], float number ){

  int c = int( number * 8. );

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
  }else if( c == 6 ){
    w = a[6];
  }else{
    w = a[7];
  }

  return w;

}



void main(){

  vec4 pos = texture2D( t_pos , vUv );
 // vec4 oPos = texture2D( t_oPos , vUv );
  vec4 og = texture2D( t_og , vUv );
  vec4 block = texture2D( t_block , vUv );

  //pos.a += .002; //*  rand( vUv * (time+1.) * 1000. );


  //float noise = abs(snoise( vUv* (1. + vec2( sin( time * 10. ) , cos( time * 1.)) ))*0.);
  float noise = abs(snoise( vUv*2. + vec2( sin( time*.3 ) ,cos( time*.4 ) )));
//  pos.a += .01 *noise; //*  rand( vUv * (time+1.) * 1000. );
  pos.a += .02 * ( noise)* ( noise); //*  rand( vUv * (time+1.) * 1000. );

   
  if( block.r < .5 && pos.a < 2.){

    float l = texture2D( t_pos , vUv + vec2( -size , 0.  ) ).r;
    float r = texture2D( t_pos , vUv + vec2( size , 0.  ) ).r;
    float u = texture2D( t_pos , vUv + vec2( 0. , -size  ) ).r;
    float d = texture2D( t_pos , vUv + vec2( 0. , size  ) ).r;

    float l2 = texture2D( t_pos , vUv + vec2( -size , size  ) ).r;
    float r2 = texture2D( t_pos , vUv + vec2( size , -size  ) ).r;
    float u2 = texture2D( t_pos , vUv + vec2( -size , -size  ) ).r;
    float d2 = texture2D( t_pos , vUv + vec2( size , size  ) ).r;

    float a[8];

    a[0] = l;  a[1] = r;  a[2] = u;  a[3] = d;
    a[4] = l2; a[5] = r2; a[6] = u2; a[7] = d2;

    float dif[8];

    dif[0] = abs( l  - pos.r ); dif[1] = abs( r  - pos.r );
    dif[2] = abs( u  - pos.r ); dif[3] = abs( d  - pos.r );
    dif[4] = abs( l2 - pos.r ); dif[5] = abs( r2 - pos.r );
    dif[6] = abs( u2 - pos.r ); dif[7] = abs( d2 - pos.r );


    if( pos.g < 1. ){

      float v =  getSideValue( a);
      if( abs(v - pos.r) > .1 ){
        
        float yes = rand( vUv * (time+1.) * 1000. );
       
        //if( yes > .00001 ){
          pos.r = min( 1. , pos.r+ min( .6 , v));
        //}


        pos.g = 1.;

      }

    }else{

      if( pos.g < 1.5 && pos.a < 2.4 ){
        if( 
          dif[0] < .1 &&
          dif[1] < .1 &&
          dif[2] < .1 &&
          dif[3] < .1 &&
          dif[4] < .1 &&
          dif[5] < .1 &&
          dif[6] < .1 &&
          dif[7] < .1 
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

  }else{



  }
  

  
  gl_FragColor =  pos;//vec4( 1. );


}
