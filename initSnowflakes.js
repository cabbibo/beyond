function initSnowflakes(){

  
  var ss = shaders.ss.snowflake1;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );

  var ss = shaders.ss.snowflake2;
  var vs = shaders.vs.debugMesh;
  var fs = shaders.fs.debugMesh;

  var s = new Snowflake( ss , vs , fs );
  snowflakes.push( s );



}
