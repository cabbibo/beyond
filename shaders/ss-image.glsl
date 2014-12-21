
uniform vec2 resolution;
uniform sampler2D t_pos;
uniform sampler2D t_oPos;
uniform sampler2D t_og;

uniform float time;
uniform sampler2D t_audio;
uniform sampler2D t_sim;

const float size = @SIZE;

void main(){

  float iSize = 1. / size;
   
  vec2 uv = gl_FragCoord.xy / resolution ;
  vec4 pos = texture2D( t_pos , uv );
  vec4 sim = texture2D( t_sim , uv );
  vec2 d = uv - vec2( .5+iSize / 2. );
     

  // Sets our 'seed' 
  // of the crystal
  if( length(d) < iSize  ){

    pos.x = 1.;
    pos.y = .0;
    pos.z = 1.;
    pos.a = -.1;

  }

  vec4 audio = texture2D( t_audio , vec2( sim.y , 0. ) );
 
  if( pos.a > 0. && length( d )  < .49 ){

    vec4 dP[ 4 ];
    vec2 s[ 4 ];

    s[0] = uv + vec2( iSize , 0. );
    s[1] = uv + vec2( -iSize , 0. );
    s[2] = uv + vec2( 0. , iSize );
    s[3] = uv + vec2( 0. , -iSize );
    
    dP[0] = texture2D( t_pos , s[0] );
    dP[1] = texture2D( t_pos , s[1] );
    dP[2] = texture2D( t_pos , s[2] );
    dP[3] = texture2D( t_pos , s[3] );

     // Part of crystal
    if( pos.z > .5 ){

      pos.x += length( audio );
      pos.a -= 10.;
    
    }else{

      //pos.y -= sim.x;
      
      for( int i = 0; i < 4; i++ ){

        vec4 data = dP[i];

        if( data.z > .5 ){

          pos.y -=  sim.x * length( audio ) * sim.a * 20. ;// abs(1.-sim.x) * 50.;
          //pos.a -= sim.x;

        }

      }


      if( pos.y < 0. ){

        pos.z += 1.;
        pos.x +=  1.;


      }

     // pos.a -= sim.x;



    }





  }


  //pos.x = sim.z;
  gl_FragColor = pos;

}
