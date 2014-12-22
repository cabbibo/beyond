var fade = document.getElementById( 'fade' );

var planeObject;

function createShafts() {

	planeObject = new THREE.Object3D();
	var planeMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/shaft.png' ), color: 0x17249b, emissive: 0xffffff, opacity: .1, transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending } );
	var planeGeometry = new THREE.PlaneGeometry( 100, 10000 );
	for( var j = 0; j < 100; j++ ) {
		var plane = new THREE.Mesh( planeGeometry, planeMaterial );
		plane.position.x = ( .5 - Math.random() ) * 500;
		plane.position.y = ( .5 - Math.random() ) * 5000;
		plane.position.z = ( .5 - Math.random() ) * 500;
		plane.rotation.z = ( .5 - Math.random() ) * Math.PI / 4;
		planeObject.add( plane );
	}
	scene.add( planeObject );

}	

var particles, particleSystem;

function createParticles() {

	particles = new THREE.Geometry();
	
	var pMaterial = new THREE.PointCloudMaterial({
		color: 0xFFFFFF,
		map: THREE.ImageUtils.loadTexture( 'img/coc.png' ),
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		opacity: 1,
		size: 4
	} );

	var num = 2000;
	for(var p = 0; p < num; p++) {

		var particle = new THREE.Vector3(
			Math.random() * 1000 - 500, 
			Math.random() * 1000 - 500, 
			Math.random() * 1000 - 500 
		);
		particle.velocity = new THREE.Vector3(
			.5 - Math.random(),
			-( .1 + Math.random() ),
			.5 - Math.random()
		);

		particles.vertices.push(particle);
	}

	particleSystem = new THREE.PointCloud( particles, pMaterial );
	particleSystem.sortParticles = true;

	scene.add( particleSystem );

}

function updateParticles( t, p ) {

	particleSystem.position.copy( p );
	particleSystem.rotation.y = .05 * t;

	var pCount = particles.vertices.length;
	while( pCount-- ) {
		
		var particle = particles.vertices[ pCount ];
		
		if( particle.y < -500 ){
			particle.set (
				Math.random() * 1000 - 500,
				500,
				Math.random() * 1000 - 500			
			);
		}
		
		particle.x += .1 * Math.sin( t );
		particle.y += .1 * Math.sin( .9 * t );
		particle.z += .1 * Math.sin( 1.1 * t );
		
		particle.add( particle.velocity );
	}

}

var cylinder;
var flakes = [];

function initScene() {

	var material = new THREE.ShaderMaterial( {

		uniforms: { 
			tHeight: { type: 't', value: THREE.ImageUtils.loadTexture( 'img/heightmap.png' ) },
			tPano: { type: 't', value: THREE.ImageUtils.loadTexture( 'img/pano-blur-red.jpg' ) },
			tNormal: { type: 't', value: THREE.ImageUtils.loadTexture( 'img/NormalMap.png' ) },
			tDetailNormal: { type: 't', value: THREE.ImageUtils.loadTexture( 'img/Scratch-Norm.png' ) },
			tMatCap: { type: 't', value: THREE.ImageUtils.loadTexture( 'img/matcap-red.jpg' ) },
			time: { type: 'f', value: 0 }
		},
		vertexShader: shaders.vs.spiteSnow,
        fragmentShader: shaders.fs.spiteSnow,
		shading: THREE.SmoothShading,
		side: THREE.DoubleSide,
		depthTest: false,
		depthWrite: false,
		transparent: true,
		//blending: THREE.AdditiveBlending
	} );

	material.uniforms.tDetailNormal.value.wrapS = material.uniforms.tDetailNormal.value.wrapT = THREE.RepeatWrapping;
	//var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'flake.png' ), transparent: true, side: THREE.DoubleSide }) 

	for( var j = 0; j < 5; j++ ) {
		var size = 140;
		var group = new THREE.Object3D();
		for( var i = 0; i < 3; i++ ) {
			var flake = new THREE.Mesh( new THREE.PlaneGeometry( size, size, 1, 1 ), material );
			flake.geometry.computeTangents();
			var s = .5 + .5 * Math.random();
			flake.position.z = i * 5;
			flake.scale.set( s, s, s );
			//flake.rotation.x = Math.random() * 2 * Math.PI;
			flake.rotation.z = Math.random() * 2 * Math.PI;
			group.add( flake );
		}
		group.position.x = 0;
		group.position.y = -750 + 1500 * j / 4;
		group.position.z = 100;
		scene.add( group );
		flakes.push( group );
	}

	cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 500, 500, 5000, 36, 50 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/tunnel.jpg' ), side: THREE.DoubleSide } ) ) ;
	scene.add( cylinder );

	var top = new THREE.Mesh( new THREE.PlaneGeometry( 1024, 1024 ), new THREE.MeshBasicMaterial( { color: 0xffffff, emissive: 0xffffff, side: THREE.DoubleSide } ) );
	top.position.y = 2490;
	top.rotation.x = Math.PI / 2;
	scene.add( top );

	var bottom = new THREE.Mesh( new THREE.PlaneGeometry( 1024, 1024 ), new THREE.MeshBasicMaterial( { color: 0, emissive: 0, side: THREE.DoubleSide } ) );
	bottom.position.y = -2490;
	bottom.rotation.x = Math.PI / 2;
	scene.add( bottom );

	createParticles();
	createShafts();
	
}

function updateScene( t ) {
	
	if( isNaN( t ) ) return;

	updateStory( t );

	updateParticles( t, camera.position );
	planeObject.rotation.y = .05 * t;
	cylinder.rotation.y = .05 * t;

	camera.lookAt( camera.target );
	
}
