function initLoadSnowflake(){

   var PARAMS = {

      guide:{
        
        lengthRandomness: .5,
        lengthMultiplier: .5,
        heightRandomness: .5,
        heightMultiplier: .5,
        widthRandomness: .5,
        widthMultiplier: .5,
        branchLateness: 0,//1.8,
        branches: 2,
        maxDepth: 6,
        branchChance: .6,
        minChildren: 5,
        maxChildren: 10,
        length: 1.,
        width: 1.,
        height: .1,
        position: 0,

      },

      guideRanges:{

        lengthRandomness: [ 0  , 1  ],
        lengthMultiplier: [ 0  , 1  ],
        heightRandomness: [ 0  , 1  ],
        heightMultiplier: [ 0  , 1  ],
        widthRandomness:  [ 0  , 1  ],
        widthMultiplier:  [ 0  , 1  ],
        branchLateness:   [ 0  , 1  ],//1.8,
        branches:         [ 1  , 20 ],
        maxDepth:         [ 1  , 10 ],
        branchChance:     [ 0  , 1  ],
        minChildren:      [ 1  , 10 ],
        maxChildren:      [ 11 , 30 ],
        length:           [ .1 , 2 ],
        width:            [ .1 , 2 ],
        height:           [ .1 , .2 ],
        position:         [  0 , 1 ]

      },

      branch:{

        length: 50,
        width:  40,
        height: 100,
        extraH:.5, 
        vDepth: .2,

        lengthRandomness: .00001,
        widthRandomness: .0001,
        heightRandomness: .0001,
        angleRange:.01
        
      },

      branchRanges:{

        length: [ 20 , 100 ],
        width:  [ 10 , 60 ],
        height: [ 5 , 50  ],
        extraH: [ 0 , .5 ], 
        vDepth: [ 0 , .5 ],

        lengthRandomness: [ 0.00001 , .1 ],
        widthRandomness: [ 0.00001 , .1 ],
        heightRandomness: [ 0.00001 , .1 ],
        angleRange:[ 0.00001 , .1 ],        
      },

      randomSnowflake: function(){ nextSnowflake( true ); },
      nextSnowflake: function(){ nextSnowflake(); },

    }


  var geometry = new SnowflakeGeometry(
    PARAMS.guide,
    PARAMS.branch
  );

  var vs = [

    "attribute float fade;",
    "attribute float edge;",
    "attribute float id;",
    "",
    "",
    "varying vec2 vSEM;",
    "varying vec3 vEye;",
    "varying vec3 vNorm;",
    "varying float vFR;",
    "",
    "varying float vFade;",
    "varying float vEdge;",
    "varying float vID;",
    "",
 
    "",
    "void main(){",
    "",
    "",
    "  vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );",
    "  ",
    "  vFade = fade;",
    "  vEdge = edge;",
    "  vID = id;",
    "  ",
    "  vEye = normalize( mvPos.xyz );",
    "  vNorm = normalize(normalMatrix * normal);",
    "",
    "  vFR = dot( vEye , vNorm );",
    "  ",
    "",
    "  gl_Position = projectionMatrix * mvPos;",
    "",
    "}"


  ].join("\n");


  var fs = [
  
   // "uniform sampler2D t_matcap;",
    "uniform float filled;",
    "  ",
    "varying vec2 vSEM;",
    "varying vec3 vEye;",
    "varying vec3 vNorm;",
    "varying float vFR;",
    "",
    "varying float vFade;",
    "varying float vEdge;",
    "varying float vID;",
    "",
    "void main(){",
    "",
    "",
   // "  vec4 sem = texture2D( t_matcap , vSEM );",
    "",
    "  vec4 nCol =  vec4( -vNorm * .5 + .7 , 1. );",
    "",
    "  vec4 color = nCol;", //* pow(( 1.-abs(vFR)) , 10. );",
    "",
    "  if( vID + vFade*( 1. + vEdge )> filled ){",
    "",
    "    color.w =  0. ;",
    "",
    "  }",
    "",
    "",
    "  gl_FragColor = ( 1. - pow( vFR , 10. ))* color;",
    "",
    "}"

  ].join("\n");



  var attributes = {
    normal:{type:"v3" , value:null },
    fade: { type:"f" , value:null },
    edge: { type:"f" , value:null },
    id: { type:"f" , value:null }
  }
  
  var uniforms = {
   // t_matcap:{type:"t" , value:matcap},
    filled:{type:"f" , value:0}
  }

  var material = new THREE.ShaderMaterial({

    attributes: attributes,
    uniforms:   uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    side: THREE.DoubleSide

  });

  //var material = new THREE.MeshNormalMaterial();

  var snowflake = new THREE.Mesh( geometry , material );
  return snowflake;


}
