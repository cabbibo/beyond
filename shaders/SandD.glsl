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

