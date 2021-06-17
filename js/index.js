var clock = new THREE.Clock;

var scene, camera, renderer, controls;

var movingCar;
var cubes = [];
var car;

init();
animate();


function init() {
	// Scene + Camera + Renderer
	scene = new THREE.Scene()
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 1, 20000)
	renderer = new THREE.WebGLRenderer({ antialias: true });
	camera.position.set(0, 170, 400);

	//AMBIENTAL LIGHT
	renderer.setSize(screenWidth * 0.85, screenHeight * 0.85)

	ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
	scene.add(ambientLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	directionalLight.position.set(200, 500, 300);
	scene.add(directionalLight); 

 	document.body.appendChild( renderer.domElement )
 	THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(-300, -1, 200));
    material = new THREE.LineBasicMaterial({
        color: 0x6699FF, linewidth: 5, fog: true
    });

    //HIGHWAY LINES
	    var line1 = new THREE.Line(geometry, material);
	    scene.add(line1);
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(300, -1, 200));
    var line2 = new THREE.Line(geometry, material);
    scene.add(line2);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(300, -1, 200));
    var line2 = new THREE.Line(geometry, material);
    scene.add(line2);

    //CAR
    movingCar = new THREE.Group();

    //WHEEL COMPONENTS
    geometryWheel = new THREE.BoxBufferGeometry(25, 2, 33);
	materialWheel = new THREE.MeshStandardMaterial({ color: 0x333333 });

	//BACKWHEELS
	backWheel = new THREE.Mesh(geometryWheel, materialWheel);
	backWheel.position.y = 6;
  	backWheel.position.x = -18;
	movingCar.add(backWheel);

	//FRONTWHEELS
	frontWheel = new THREE.Mesh(geometryWheel, materialWheel);
	frontWheel.position.y = 6;  
  	frontWheel.position.x = 18;
  	movingCar.add(frontWheel);

  	//MAIN COMPONENTS
    var mainGeometry = new THREE.BoxBufferGeometry(50, 25, 60);
    var mainMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
    });

    //MAIN
    main = new THREE.Mesh(mainGeometry, mainMaterial);
    main.position.y = 12;
    movingCar.add(main);

    movingCar.position.set(0, 25, -20);

	//CABIN WINDOWS
	cabinWindow = new THREE.Mesh(
		new THREE.BoxBufferGeometry(28, 17, 25),
		new THREE.MeshStandardMaterial({ color: 0x656565})
	)
	cabinWindow.position.x = 0;
	cabinWindow.position.y = 28;
	movingCar.add(cabinWindow);

    //CABIN
    cabin = new THREE.Mesh(
	    new THREE.BoxBufferGeometry(33, 13, 24),
	    new THREE.MeshStandardMaterial({ color: 0xffffff }),
	);
	cabin.position.x = 0;
	cabin.position.y = 30.5;
	movingCar.add(cabin);

	//CAR EXHAUST
	cabinExhaust = new THREE.Mesh(
	    new THREE.BoxBufferGeometry(3, 3, 30),
	    new THREE.MeshStandardMaterial({ color: 0x383737 }),
	);
	cabinExhaust.position.x = -7;
	cabinExhaust.position.y = -10;
	movingCar.add(cabinExhaust);

	//ADD CAR TO THE SCENE
    scene.add(movingCar);
}

function animate() {
	requestAnimationFrame(animate);
	update();
	renderer.render(scene, camera);
}

function update() {
	var delta = clock.getDelta();
}
