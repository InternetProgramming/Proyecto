var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;

var scene, camera, renderer, controls;

var movingCar;
var collideMeshList = [];
var cubes = [];
var car;
var crash = false;
var score = 0;
var score1 = 1000000;
var score2 = 999050;
var score3 = 854541;
var score4 = 784515;
var score5 = 458745;
var num_crashes = 0;
var scoreText = document.getElementById("score");
var livesText = document.getElementById("lives");
var gameoverText = document.getElementById("gameover");
var form_id = document.getElementById("form_id");
var lives = 3;
var id = 0;
var crashId = '';
var lastCrashId = '';
var end_cubes = false;

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
	form_id.hidden = true;
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

    //HIGHWAY LINES
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(-300, -1, 200));
    material = new THREE.LineBasicMaterial({
        color: 0x6699FF, linewidth: 5, fog: true
    });
    var line1 = new THREE.Line(geometry, material);
    scene.add(line1);
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(300, -1, 200));
    var line2 = new THREE.Line(geometry, material);
    scene.add(line2);

    //CAR
    movingCar = new THREE.Group();

    //WHEEL COMPONENTS
    geometryWheel = new THREE.BoxGeometry(60, 12, 12);
	materialWheel = new THREE.MeshBasicMaterial({ color: 0x333333 });

	//BACKWHEELS
	backWheel = new THREE.Mesh(geometryWheel, materialWheel);
	backWheel.position.y = 6;
  	backWheel.position.x = 0;
  	backWheel.position.z = 20;
	movingCar.add(backWheel);

	//FRONTWHEELS
	frontWheel = new THREE.Mesh(geometryWheel, materialWheel);
	frontWheel.position.y = 6;  
  	frontWheel.position.x = 0;
  	backWheel.position.z = -25;
  	movingCar.add(frontWheel);

  	//MAIN COMPONENTS
    var mainGeometry = new THREE.BoxGeometry(50, 25, 60, 5, 5, 5);
    var mainMaterial = new THREE.MeshLambertMaterial({
        color: 0x0094c6,
    });

    //MAIN
    main = new THREE.Mesh(mainGeometry, mainMaterial);
    main.position.y = 12;
    main.name = 'main';

    movingCar.add(main);


	//CABIN WINDOWS
	cabinWindow = new THREE.Mesh(
		new THREE.BoxGeometry(28, 17, 25),
		new THREE.MeshLambertMaterial({ color: 0x656565})
	)
	cabinWindow.position.x = 0;
	cabinWindow.position.y = 28;
	movingCar.add(cabinWindow);

    //CABIN
    cabin = new THREE.Mesh(
	    new THREE.BoxGeometry(33, 13, 24),
	    new THREE.MeshLambertMaterial({ color: 0xffffff }),
	);
	cabin.position.x = 0;
	cabin.position.y = 30.5;
	movingCar.add(cabin);

	//CAR EXHAUST
	cabinExhaust = new THREE.Mesh(
	    new THREE.BoxGeometry(3, 3, 30),
	    new THREE.MeshLambertMaterial({ color: 0x383737 }),
	);
	cabinExhaust.position.x = -7;
	cabinExhaust.position.y = -10;
	movingCar.add(cabinExhaust);

	//DIRECTIONAL LEFT CAR
	directionalLeft = new THREE.Mesh(
		new THREE.BoxGeometry(6, 6, 1),
		new THREE.MeshLambertMaterial({ color: 0xF19609})
	);
	directionalLeft.position.x = -17;
	directionalLeft.position.y = 25;
	directionalLeft.position.z = 50;
	movingCar.add(directionalLeft);

	//RED LIGHT LEFT
	redLightlLeft = new THREE.Mesh(
		new THREE.BoxGeometry(6, 6, 1),
		new THREE.MeshLambertMaterial({ color: 0xce2e2c})
	);
	redLightlLeft.position.x = -11;
	redLightlLeft.position.y = 25;
	redLightlLeft.position.z = 50;
	movingCar.add(redLightlLeft);

	//WHITE LIGHT RIGHT
	witheLightlLeft = new THREE.Mesh(
		new THREE.BoxGeometry(2, 6, 1),
		new THREE.MeshLambertMaterial({ color: 0xFFFFFF})
	);
	witheLightlLeft.position.x = -7;
	witheLightlLeft.position.y = 25;
	witheLightlLeft.position.z = 50;
	movingCar.add(witheLightlLeft);


	//DIRECTIONAL RIGHT CAR
	directionalRight = new THREE.Mesh(
		new THREE.BoxGeometry(6, 6, 1),
		new THREE.MeshLambertMaterial({ color: 0xF19609})
	);
	directionalRight.position.x = 17;
	directionalRight.position.y = 25;
	directionalRight.position.z = 50;
	movingCar.add(directionalRight);

	//RED LIGHT RIGHT
	redLightlRight = new THREE.Mesh(
		new THREE.BoxGeometry(6, 6, 1),
		new THREE.MeshLambertMaterial({ color: 0xce2e2c})
	);
	redLightlRight.position.x = 11;
	redLightlRight.position.y = 25;
	redLightlRight.position.z = 50;
	movingCar.add(redLightlRight);

	//WHITE LIGHT RIGHT
	witheLightlRight = new THREE.Mesh(
		new THREE.BoxGeometry(2, 6, 1),
		new THREE.MeshLambertMaterial({ color: 0xFFFFFF})
	);
	witheLightlRight.position.x = 7;
	witheLightlRight.position.y = 25;
	witheLightlRight.position.z = 50;
	movingCar.add(witheLightlRight);

	//LICENSE PLAQUE
	plaque = new THREE.Mesh(
		new THREE.BoxGeometry(13, 6, 1),
		new THREE.MeshLambertMaterial({ color: 0xFFFFFF})
	);
	plaque.position.x = 0;
	plaque.position.y = 15;
	plaque.position.z = 50;
	movingCar.add(plaque);

    movingCar.position.set(0, 25, -20);

	//ADD CAR TO THE SCENE
    scene.add(movingCar);
}

function animate() {
	requestAnimationFrame(animate);
	update();
	renderer.render(scene, camera);
}

function update() {
	livesText.innerText = "Lives:" + Math.floor(lives);
	var delta = clock.getDelta();
	var moveDistance = 200 * delta;
	var rotateAngle = Math.PI / 2 * delta;
	if ((keyboard.pressed("left") || keyboard.pressed("A")) && end_cubes == false) {
		if (movingCar.position.x > -270)
			movingCar.position.x -= moveDistance;
		if (camera.position.x > -150) {
			camera.position.x -= moveDistance * 0.6;
			if (camera.rotation.z > -5 * Math.PI / 180) {
				camera.rotation.z -= 0.2 * Math.PI / 180;
			}
		}
	}

	if ((keyboard.pressed("right") || keyboard.pressed("D")) && end_cubes == false) {
		if (movingCar.position.x < 270)
            movingCar.position.x += moveDistance;
        if (camera.position.x < 150) {
            camera.position.x += moveDistance * 0.6;
            if (camera.rotation.z < 5 * Math.PI / 180) {
                camera.rotation.z += 0.2 * Math.PI / 180;
            }
        }
	}

	if ((keyboard.pressed("up") || keyboard.pressed("W")) && end_cubes == false) {
        movingCar.position.z -= moveDistance;
    }
    if (keyboard.pressed("ctrl") && end_cubes == true) {
        score = 0;
        end_cubes = false;
        lives = 3;
        livesText.innerText = "Lives:" + Math.floor(lives);
        gameoverText.innerText = "";
		form_id.hidden = true;

    }
    if ((keyboard.pressed("down") || keyboard.pressed("S")) && end_cubes== false) {
        movingCar.position.z += moveDistance;
    }

    if (!(keyboard.pressed("left") || keyboard.pressed("right") ||
        keyboard.pressed("A") || keyboard.pressed("D"))) {
        delta = camera.rotation.z;
        camera.rotation.z -= delta / 10;
    }

    originPoint = movingCar.position.clone();

    main = movingCar.getObjectByName('main');

    for (var vertexIndex = 0; vertexIndex < main.geometry.vertices.length; vertexIndex++){

    	var localVertex = main.geometry.vertices[vertexIndex].clone();
    	var globalVertex = localVertex.applyMatrix4(movingCar.matrix);
    	var directionVector = globalVertex.sub(main.position);
    	var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());

    	//COLLISION
    	var collisionResults = ray.intersectObjects(collideMeshList);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            crash = true;
            crashId = collisionResults[0].object.name;
            //lives = lives - 1
            break;
        }
        crash = false;

    }

    if (crash) {
        main.material.color.setHex(0x333333);
        console.log("Crash");
        if (crashId !== lastCrashId) {
            lastCrashId = crashId;
            num_crashes = num_crashes + 1
            //crashesText = toString(num_crashes);
            if (end_cubes == false){
            	lives -= 1;
            	livesText.innerText = "Lives:" + Math.floor(lives);
            }
        }

    } else {
        main.material.color.setHex(0x0094c6);
    }

    if (lives == 0) {
    	end_cubes = true;
    	livesText.innerText = "";
    	gameoverText.innerText = "Game over press ctrl for restar \nHighscore\nFer " + Math.floor(score1) + "\nFer " + Math.floor(score2) + "\nFer "+ Math.floor(score3) + "\nFer "+ Math.floor(score4) + "\nFer " + Math.floor(score5) + "\n";
    	console.log('Game Over');
		form_id.hidden = false;
    	
    }

    if (Math.random() < 0.04 && cubes.length < 30 && end_cubes == false) {
        box = makeRandomCube();
    }

    for (i = 0; i < cubes.length; i++) {
        if (cubes[i].position.z > camera.position.z) {
            scene.remove(cubes[i]);
            cubes.splice(i, 1);
            collideMeshList.splice(i, 1);
        } else {
            cubes[i].position.z += 10;
        }
    }

    if (end_cubes == false) {
    	score += 0.1;
    }
    scoreText.innerText = "Score:" + Math.floor(score);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function makeRandomCube() {
    var a = 1 * 50,
        b = getRandomInt(1, 3) * 50,
        c = 1 * 50;
    var geometry = new THREE.CubeGeometry(a, b, c);
    var material = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
    });


    var box = new THREE.Mesh(geometry, material);
    box.material.color.setHex(Math.random() * 0xffffff);

    box.position.x = getRandomArbitrary(-250, 250);
    box.position.y = 1 + b / 2;
    box.position.z = getRandomArbitrary(-800, -1200);
    cubes.push(box);
    box.name = "box_" + id;
    id++;
    collideMeshList.push(box);
    scene.add(box);
}
