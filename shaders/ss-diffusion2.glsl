

const float size = @SIZE;

uniform sampler2D t_pos;
uniform sampler2D t_oPos;
uniform sampler2D t_og;

uniform float time;
uniform sampler2D t_audio;

varying vec2 vUv;


float rand( vec2 u ){
  return abs(sin( 7532.51 * sin( u.x * 19123333.33 ) * cos( u.y * 11326.1421 ) ));
}

void main(){

  vec4 pos = texture2D( t_pos , vUv );
 // vec4 oPos = texture2D( t_oPos , vUv );
  vec4 og = texture2D( t_og , vUv );

  //if( pos.b < .5 ){
  if( pos.r < 2.4 && pos.g < 2. ){
    
    vec4 l = vec4( 0. );
    float r = rand( vUv * time );

    if( r > .1 ){

      float l = texture2D( t_pos , vUv + vec2( -size , 0.  ) ).r;
      float r = texture2D( t_pos , vUv + vec2( size , 0.  ) ).r;
      float u = texture2D( t_pos , vUv + vec2( 0. , -size  ) ).r;
      float d = texture2D( t_pos , vUv + vec2( 0. , size  ) ).r;

      float l2 = texture2D( t_pos , vUv + vec2( -size , size  ) ).r;
      float r2 = texture2D( t_pos , vUv + vec2( size , -size  ) ).r;
      float u2 = texture2D( t_pos , vUv + vec2( -size , -size  ) ).r;
      float d2 = texture2D( t_pos , vUv + vec2( size , size  ) ).r;
      
      int c = int( rand( vUv * time) * 8. );

      float w = 0.;

      if( c == 0 ){
        w = l;
      }else if( c == 1 ){
        w = r;
      }else if( c == 2 ){
        w = u;
      }else if( c == 3 ){
        w = d;
      }else if( c == 4 ){
        w = l2;
      }else if( c == 5 ){
        w = r2;
      }else if( c == 6 ){
        w = u2;
      }else{
        w = d2;
      }

      pos.r += min( .4 , w );// vec4( l + r+ u + d , 1. , 0. , 0. );
      pos.g += w * 10.;
 
    }else{

      if( pos.r > .5 ){

        float l = texture2D( t_pos , vUv + vec2( -size , 0.  ) ).r;
        float r = texture2D( t_pos , vUv + vec2( size , 0.  ) ).r;
        float u = texture2D( t_pos , vUv + vec2( 0. , -size  ) ).r;
        float d = texture2D( t_pos , vUv + vec2( 0. , size  ) ).r;

        float l2 = texture2D( t_pos , vUv + vec2( -size , size  ) ).r;
        float r2 = texture2D( t_pos , vUv + vec2( size , -size  ) ).r;
        float u2 = texture2D( t_pos , vUv + vec2( -size , -size  ) ).r;
        float d2 = texture2D( t_pos , vUv + vec2( size , size  ) ).r;
      
        float dif = abs(pos.r - l );
        dif +=  abs(pos.r - r );
        dif +=  abs(pos.r - u );
        dif +=  abs(pos.r - d );
        dif +=  abs(pos.r - l2 );
        dif +=  abs(pos.r - r2 );
        dif +=  abs(pos.r - u2 );
        dif +=  abs(pos.r - d2 );

        if( d < .1 ){

          pos.r += 10.;

        }
      
      }
     

      
      //pos.g += 1.; //vec4( 0. , 1. , 0. , 0. );


    }

  }

  
  gl_FragColor =  pos;//vec4( 1. );


}
