vec2 getCenterPos( vec2 p ){

    vec2 pBase = vec2( fract( p.x ) , fract( p.y ) );
    
    vec2 pQuant = floor(p); //- pBase;
     
    float offset = clamp( mod(pQuant.y   , 4. )-1. , 0. , 1. );
    
   // if( offset == 1. ){ offset = 1.; }
    
    float row2Shift = mod( pQuant.y , 2. );
    float row4Shift = mod( pQuant.y , 2. );
    float col2Shift = mod( pQuant.x + offset , 2. );
   
    
    
   	vec2 centerPos = vec2( 0. );
    
    if( row2Shift == 1. ){
        
        //center is to the left
        if( col2Shift == 0. ){
         
           centerPos = pQuant + vec2( 0. , 0.5 );
        //center is to the right
        }else if( col2Shift == 1. ){
            centerPos = pQuant + vec2( 1. , 0.5 );
            
        }
        
    }else if( row2Shift == 0. ){
     
        
        // Row shift 1. && 3. will never appear hear.
        if( row4Shift == 0. ){
            
            if( col2Shift == 0. ){
             
                if( pBase.x > pBase.y ){
                    
                    centerPos = pQuant + vec2( 1. , -.5  );
                    
                }else{
                    
                    centerPos = pQuant + vec2( 0. ,1.5 );
             
                }
                
                
            }else if( col2Shift == 1. ){
                
                
                 if( 1. - pBase.x > pBase.y ){
                    
                    centerPos = pQuant + vec2( 0. , -.5  );
                    
                }else{
                    
                    centerPos = pQuant + vec2( 1. , 1.5 );
             
                }
                
                
            }
            
            
        }else if( row4Shift == 2. ){
            
            
             if( col2Shift == 0. ){
             
                
                if( 1. - pBase.x > pBase.y ){
                    
                    centerPos = pQuant + vec2( 0. , -.5  );
                    
                }else{
                    
                    centerPos = pQuant + vec2( 1. , 1.5 );
             
                }
                
            }else if( col2Shift == 1. ){
                
                
                if( pBase.x > pBase.y ){
                    
                    centerPos = pQuant + vec2( 1. , -.5  );
                    
                }else{
                    
                    centerPos = pQuant + vec2( 0. ,1.5 );
             
                }

            }
            
        }
    
    }
    
    return centerPos;
                  
                
}

