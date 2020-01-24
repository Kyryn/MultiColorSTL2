var container = document.getElementById('container');

var W = 500, H = 400;
//   window.innerWidth, window.innerHeight ;

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xEEEEEE);


var camera = new THREE.PerspectiveCamera(75, W / H, 1, 1000);
//        camera.position.set(3, 0.15, 20);
camera.position.z = 200;


var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(W, H);
//    renderer.setPixelRatio( window.devicePixelRatio );
//    renderer.gammaInput = true;
//    renderer.gammaOutput = true;
//    renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = 0.05;
controls.dampingFactor = 0.1;
controls.enableZoom = true;
//    controls.autoRotate = true;
//    controls.autoRotateSpeed = .75;
//    controls.addEventListener( 'change', render );


//    scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
//    var ambientLight = new THREE.AmbientLight( 0x0f0f0f );
//    scene.add( ambientLight );


// var loader = new THREE.ThreeMFLoader();
// loader.load( '/stl/grinder.3mf', function ( object ) {
//
//     console.log("3mf model loading",object);
//
//     object.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0 ) ); 	// z-up conversion
//     object.traverse( function ( child ) {
//         child.castShadow = true;
//     } );
//     scene.add( object );
//     // render();
// } );





var mesh;
var loader = new THREE.STLLoader();
//    loader.load('/stl/test1.stl', function (geometry) {
//    loader.load('/stl/bf4.stl', function (geometry) {
//    loader.load('/stl/BT4 80per.stl', function (geometry) {
//    loader.load('/stl/BT4 8020per.stl', function (geometry) {
loader.load('/stl/BT4 8080per.stl', function (geometry) {

    console.log('Load', geometry);

    geometry.center()

//        var material = new THREE.MeshPhongMaterial({color: 0xff5533, specular: 0x111111, shininess: 200});
//        var material = new THREE.MeshStandardMaterial({
    var material = new THREE.MeshBasicMaterial({
//        var material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
//            color: 0xF5F5F5,
//            flatShading: true,
//            combine:THREE.MixOperation,
        color: 0xffffff,
//            shininess: 0,
        vertexColors: THREE.VertexColors
    })

    mesh = new THREE.Mesh(geometry, material);
//        mesh.position.set( 0, - 0.25, 0.6 );
//        mesh.scale.set(0.5, 0.5, 0.5);
    mesh.rotation.set(-Math.PI / 2, 0, 0);
//        mesh.castShadow = true;
//        mesh.receiveShadow = true;


       updateColors();

    scene.add(mesh);
    console.log(mesh);
});


var animate = function () {
    requestAnimationFrame(animate);

//        if (mesh) {
//            mesh.rotation.x += 0.01;
//            mesh.rotation.y += 0.01;
//        }

    controls.update();
    renderer.render(scene, camera);
};

animate();


function getColorbyConfig(zindex) {
    var tempxolor = '#000000';
    for (var i = 0; i < config.length; i++) {
        var maxlimit = config[i][0];
        tempxolor = config[i][1];
        if (zindex < maxlimit) {
            return tempxolor;
        }
    }
    return tempxolor;
}


function updateColors(newconfig = null) {

    if(newconfig){
        config = newconfig;
    }

    if(!mesh){
        return false
    }


    var mgeometry = mesh.geometry;
    var positions = mgeometry.attributes.position;
    var colors = [];

    console.log('Update color', config, mgeometry.boundingBox.min.z);
    for (var i = 0; i < positions.count; ++i) {
        var zval = positions.getZ(i) - mgeometry.boundingBox.min.z;

        var zvalpercent =     ( zval / (mgeometry.boundingBox.max.z -  mgeometry.boundingBox.min.z)  ) * 100;
        var color = new THREE.Color(getColorbyConfig(zvalpercent))
        colors.push(color.r, color.g, color.b);
//                colors.setXYZ( i, color.r, color.g, color.b );
    }
//        colors.needsUpdate = true;
    mgeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return true;
}