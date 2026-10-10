import * as THREE from 'three';
import { MathUtils } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.querySelector('.sketch');

// THREE.ColorManagement.legacyMode = false;
const hsbToRgb = (h, s, b) => {
    const k = (n) => (n + h * 6) % 6;  // h normalized 0–1 → multiply by 6 for sector
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [f(5), f(3), f(1)];  // RGB in 0–1 range
};

// SIZES
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    if (!w || !h) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
}

//  CANVAS
const canvas = document.querySelector('canvas.webgl');

// SCENE
const scene = new THREE.Scene;

// OBJECT
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

// saturation or distance from pole
for (let sIdx = 0; sIdx < satSteps; sIdx++) {
    const satNorm = sIdx / (satSteps - 1);
    const satRadius = satNorm * maxR;
    const numPerRing = satNorm === 0 ? 1 : Math.max(1, Math.round(hueSteps * satNorm));

    // brightness or level
    for (let bIdx = 0; bIdx < briSteps; bIdx++) {
        const briNorm = bIdx / (briSteps - 1);
        const y = MathUtils.lerp(-cylHeight / 2, cylHeight / 2, briNorm);

        // hue or angle
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

            color.setRGB(r, g, b, THREE.SRGBColorSpace);
            // color.setRGB(r, g, b).convertSRGBToLinear();
            // color.setRGB(r, g, b);
        
            mesh.setColorAt(idx, color);

            idx++;
        }
    }
}


// CAMERA
const camera = new THREE.PerspectiveCamera( 40, 1, 1, 2500 );
camera.position.set( 0.0, 300, 700 );


// CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;


controls.dampingFactor = 0.01; // lower = more gradual slowdown
// controls.rotateSpeed = 0.8;    // optional, adjust rotation speed


// RENDERER
const renderer = new THREE.WebGLRenderer( { 
    canvas: canvas, 
    alpha: true
} );
renderer.setSize( window.innerWidth, window.innerHeight, false  );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor( 0x000000, 0 );
renderer.setAnimationLoop( animate );

new ResizeObserver(resize).observe(container);

let dragging = false;
controls.addEventListener('start', () => dragging = true);
controls.addEventListener('end', () => dragging = false);


// ANIMATION
const timer = new THREE.Timer();
timer.connect(document)
const spin = { x: 0.2, y: 1 };

function animate(timestamp) {

    timer.update(timestamp);
    const delta = timer.getDelta();
    // const elapsed = timer.getElapsed();

    controls.update();

    if(!dragging){
        // scene.rotation.x = elapsed * spin.x;
        // scene.rotation.y = elapsed * spin.y;
        mesh.rotation.x += delta * spin.x;
        // mesh.rotation.y += delta * spin.y;

    }

    renderer.render( scene, camera );
}


