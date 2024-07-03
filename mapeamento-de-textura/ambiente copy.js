import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import THREEx3 from 'three-x3';

const cenario = new THREE.Scene()
cenario.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.75;
camera.position.y = 2.97;
camera.position.x = 3.95;
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
render.shadowMap.enabled = true;
document.body.append(render.domElement)


// const light = new THREE.AmbientLight()
const HemisphereLight = new THREE.HemisphereLight(0xbba2a2, 1 );
HemisphereLight.position.y = 4;

const light = new THREE.SpotLight(0xFFFFFF, 5, 10, 0.5);

light.position.y = 7;
light.position.z = 2
light.castShadow = true;

const controls = new OrbitControls(camera, render.domElement)


cenario.add(HemisphereLight)
cenario.add(light)
const x3 = new THREEx3(
    {
        THREE: THREE, OrbitControls: OrbitControls,
        camera: camera, renderer: render, scene: cenario,
    },
    {
        grid: { visible: false },
        axes: { visible: false }
    }
)


const caixa = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
    })
)
caixa.position.x = 1
caixa.position.y = 1
caixa.castShadow = true;

const esfera = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshStandardMaterial( { 
        color: 0xFFFFFF,
        map: new THREE.TextureLoader().load('./mapeamento-de-textura/imagens/earth.jpg')
    })
)
const box = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial( { 
        color: 0xFFFFFF,
        envMap: new THREE.CubeTextureLoader().load([
            './mapeamento-de-textura/imagens/jardim.jpg',
            './mapeamento-de-textura/imagens/jardim.jpg',
            './mapeamento-de-textura/imagens/jardim.jpg',
            './mapeamento-de-textura/imagens/jardim.jpg',
            './mapeamento-de-textura/imagens/jardim.jpg',
            './mapeamento-de-textura/imagens/jardim.jpg'  
        ])
    })
)
box.position.x = 2
box.position.y = 2

esfera.castShadow = true
esfera.position.y = 2;
esfera.position.x = -2;

const plano = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshLambertMaterial({
        color: 0xFFFFFF, side: THREE.DoubleSide
    })
)

plano.rotation.x = THREE.MathUtils.degToRad(-90)
plano.receiveShadow = true;



cenario.add(box);
cenario.add(esfera);
cenario.add(plano)


x3.add(esfera, { label: 'Esfera' })
x3.add(plano, { label: 'Plano' })
x3.add(light, { label: 'luz', helper : {  visible: false }});
x3.add(HemisphereLight, { label: 'luz emisferica' });
x3.add(camera);

let angle = 0
const radius = 2;

render.setAnimationLoop(() => {
    x3.tick();

    // esfera.rotation.y += 0.1; 
    angle += 0.01; 

    esfera.position.z = radius * Math.sin(angle);
    esfera.position.x = radius * Math.cos(angle);

    x3.fps(() => {
        render.render(cenario, camera);
    });
})