

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
    if( pos.r < .2){
      
      vec4 l = vec4( 0. );
      float r = rand( vUv * time );

      if( r < .25 ){
        l = texture2D( t_pos , vUv + vec2( -size , 0.  ) );
      }

      if( r > .25 && r <.5 ){
        l = texture2D( t_pos , vUv + vec2( size , 0.  ) );
      }

      if( r > .5 && r <.75 ){
        l = texture2D( t_pos , vUv + vec2( 0. , -size  ) );
      }

      if( r > .75 ){
        l = texture2D( t_pos , vUv + vec2( 0. , size  ) );
      }

      pos += vec4( (l.r) * 1. , 0. , 0. , 0. );


    }else{

      float l = texture2D( t_pos , vUv + vec2( -size , 0.  ) ).r;
      float r = texture2D( t_pos , vUv + vec2( size , 0.  ) ).r;
      float u = texture2D( t_pos , vUv + vec2( 0. , -size  ) ).r;
      float d = texture2D( t_pos , vUv + vec2( 0. , size  ) ).r;

      float dL = abs((pos.r - l));
      float dR = abs((pos.r - r));
      float dU = abs((pos.r - u));
      float dD = abs((pos.r - d));

     /* if( dL > .0000000000001 ||  dR > .00000000001 ||  dU > .00000000000001 ||  dD > .000000000000001 ){

      
      }else{

         if( pos.r < 3. ){
          pos.r += .1;// += vec4( .3 , 0. , 0. , 0. );
        }


      }*/

      if( pos.r < 1.4 ){
        if( dL < .011 ){
           pos.r += .01;
        }
        if( dR < .011 ){
           pos.r += .01;
        }
        if( dU < .011 ){
           pos.r += .01;
        }
        if( dD < .011 ){
           pos.r += .01;
        }
      }

/*      if( dL < 0.1 &&  dR  < 0.2 && dU  < 0.2  && dD  < 0.2 ){

        if( pos.r < 1.4 ){
          pos.r += .1;
        }

      }*/

    }
  
    /*float  r = rand( vUv * time +sin( time * 1000000. ) );

    if( r > .99999 ){

      pos += vec4( 0. , 0. , 100. , 0.  );

    }*/

 // }

 /* if( pos.a < .2 ){
    
    vec4 l = vec4( 0. );
    vec4 r = vec4( 0. );
    vec4 u = vec4( 0. );
    vec4 d = vec4( 0. );
   
    if( vUv.x > size ){
      l = texture2D( t_pos , vUv + vec2( -size , 0.  ) );
    }

    if( vUv.x < 1. - size ){
      r = texture2D( t_pos , vUv + vec2( size , 0.   ) );
    }

    if( vUv.y > size ){
      u = texture2D( t_pos , vUv + vec2( 0. , size   ) );
    }

    if( vUv.y < 1. - size ){
      d = texture2D( t_pos , vUv + vec2( 0. , -size  ) );
    }

    pos += vec4( 0. , 0. , 0. , (l.a + r.a + u.a + d.a) * 1. );

  }*/


  gl_FragColor =  vec4( pos.r , 0. , pos.b , 1. );//vec4( 1. );


}
