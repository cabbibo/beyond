function initSnowflakes(){

 
  console.log( shaders.ss );


   var ss = shaders.ss.snowHex3;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );

  var ss = shaders.ss.snowHex4;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );



  var ss = shaders.ss.snowHex5;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );
   var ss = shaders.ss.snowHex6;
   var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );
   var ss = shaders.ss.test1;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;



  var ss = shaders.ss.snowHex2;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );


  var ss = shaders.ss.snowSimplex6;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );

  var ss = shaders.ss.snowSimplex7;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );


  var ss = shaders.ss.snowSimplex8;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );


 



}
