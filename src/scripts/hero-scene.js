import * as THREE from 'three';
// import { toonOutlinePass } from 'three/tsl';
import { MathUtils } from 'three';


import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

THREE.ColorManagement.legacyMode = false;

let container, stats;

let camera, controls, scene, renderer, postProcessing;


const hsbToRgb = (h, s, b) => {
    const k = (n) => (n + h * 6) % 6;  // h normalized 0–1 → multiply by 6 for sector
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [f(5), f(3), f(1)];  // RGB in 0–1 range
};

function init(  ) {

    let threeContainer = document.querySelector('.three-container');
    // container = document.createElement( 'div' );
    // threeContainer.appendChild( container );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2500 );
    camera.position.set( 0.0, 300, 500 );
    
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setClearColor( 0x000000, 0 );
    // renderer.outputColorSpace = THREE.SRGBColorSpace;
    // renderer.outputEncoding = THREE.sRGBEncoding; OLD VERSION
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight, false  );
    renderer.setAnimationLoop( animate );
    threeContainer.appendChild( renderer.domElement );

    
    const hueSteps = 36, satSteps = 10, briSteps = 10;
    const cylDiameter = 400, cylHeight = 300;
    const sphereRadius = 10;
    const maxR = cylDiameter / 2;

    const geometry = new THREE.SphereGeometry( sphereRadius, 32, 16 );
    const material = new THREE.MeshBasicMaterial();

    
    let count = 0;
    for (let a = 0; a < satSteps; a++) {
        const alpha = a / (satSteps - 1);
        const numPerRing = alpha === 0 ? 1 : Math.max(1, Math.round(hueSteps * alpha));
        count += briSteps * numPerRing;
    }
    
    
    const mesh = new THREE.InstancedMesh(geometry, material, count); 
    scene.add(mesh);
    
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    let idx = 0;

    //SATURATION or DISTANCE FROM POLE
    for (let sIdx = 0; sIdx < satSteps; sIdx++) {
        const satNorm = sIdx / (satSteps - 1);
        const satRadius = satNorm * maxR;
        const numPerRing = satNorm === 0 ? 1 : Math.max(1, Math.round(hueSteps * satNorm));

        //BRIGHTNESS or LEVEL
        for (let bIdx = 0; bIdx < briSteps; bIdx++) {
            const briNorm = bIdx / (briSteps - 1);
            const y = MathUtils.lerp(-cylHeight / 2, cylHeight / 2, briNorm);

            //HUE or ANGLE
            for (let h = 0; h < numPerRing; h++) {
                const hueNorm = h / numPerRing;
                const angle = hueNorm * (2 * Math.PI);

                const x = satRadius * Math.cos(angle);
                const z = satRadius * Math.sin(angle);

                dummy.position.set(x, y, z);
                dummy.rotation.set(0, 0, 0);
                dummy.scale.set(1, 1, 1);
                dummy.updateMatrix();
                mesh.setMatrixAt(idx, dummy.matrix);

                const [r, g, b] = hsbToRgb(hueNorm, satNorm, briNorm);

                // color.setRGB(r, g, b, THREE.SRGBColorSpace);
                color.setRGB(r, g, b).convertSRGBToLinear();
                // color.setRGB(r, g, b);
            
                mesh.setColorAt(idx, color);

                idx++;
            }
        }
    }

    // mesh.instanceMatrix.needsUpdate = true;
    // mesh.instanceColor.needsUpdate = true;


    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 200;
    controls.maxDistance = 2000;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true; // enable smooth inertia
    // controls.dampingFactor = 0.05; // lower = more gradual slowdown
    // controls.rotateSpeed = 0.8;    // optional, adjust rotation speed

    // window.addEventListener( 'resize', onWindowResize );


}

init();


// function onWindowResize() {

// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( window.innerWidth, window.innerHeight );

// }

function resizeCanvasToDisplaySize() {    // line ~148
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);   // false keeps CSS scaling intact
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}


function animate() {

    controls.update();

    resizeCanvasToDisplaySize();

    scene.rotation.y += 0.005;

    render();
}

function render() {

    const timer = Date.now() * 0.00025;

    renderer.render( scene, camera );

}

