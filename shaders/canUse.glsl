float canUse( vec2 v1 , vec2 v2 , vec2 v3 , vec2 v4 , vec2 v5 , vec2 v6 ){

  float can = 1.;

  if( v1.x < 0. || v1.x > 1. ){
    can = 0.;
  }

  if( v1.y < 0. || v1.y > 1. ){
    can = 0.;
  }

  if( v2.x < 0. || v2.x > 1. ){
    can = 0.;
  }

  if( v2.y < 0. || v2.y > 1. ){
    can = 0.;
  }

  if( v3.x < 0. || v3.x > 1. ){
    can = 0.;
  }

  if( v3.y < 0. || v3.y > 1. ){
    can = 0.;
  }

  if( v4.x < 0. || v4.x > 1. ){
    can = 0.;
  }

  if( v4.y < 0. || v4.y > 1. ){
    can = 0.;
  }

  if( v5.x < 0. || v5.x > 1. ){
    can = 0.;
  }

  if( v5.y < 0. || v5.y > 1. ){
    can = 0.;
  }

  if( v6.x < 0. || v6.x > 1. ){
    can = 0.;
  }

  if( v6.y < 0. || v6.y > 1. ){
    can = 0.;
  }

  return can;

}
