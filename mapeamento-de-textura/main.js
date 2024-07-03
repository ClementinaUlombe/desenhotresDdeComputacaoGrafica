import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import THREEx3 from 'three-x3';

const cenario = new THREE.Scene()
cenario.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.75;
camera.position.y = 5.42;
camera.position.x = -5.534;
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
render.shadowMap.enabled = true;
render.physicallyCorretLights = true
document.body.append(render.domElement)


// const light = new THREE.AmbientLight()
const HemisphereLight = new THREE.HemisphereLight(0xbba2a2, 4);
HemisphereLight.position.y = 4;

const light = new THREE.SpotLight(0xFFFFFF, 10, 10, 0.5);

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


const textura = new THREE.TextureLoader().load('https://imagedelivery.net/6Q4HLLMjcXxpmSYfQ3vMaw/2ae97f03-384f-41ee-2c74-63661705b200/900px')
const esfera = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshStandardMaterial(
        {
            map: textura
        }
    )
)

esfera.castShadow = true
esfera.position.y = 2;

const plano = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('/mapeamento-de-textura/imagens/tipos/opacity.jpg'),
        side: THREE.DoubleSide
    })
)


plano.rotation.x = THREE.MathUtils.degToRad(-90)
plano.receiveShadow = true;

cenario.add(esfera);
cenario.add(plano)


x3.add(esfera, { label: 'Esfera' })
x3.add(plano, { label: 'Plano' })
x3.add(light, { label: 'luz', helper: { visible: false } });
x3.add(HemisphereLight, { label: 'luz emisferica' });
x3.add(camera);


render.setAnimationLoop(() => {
    x3.tick();
    x3.fps(() => {
        render.render(cenario, camera);
    });
})

render.physicallyCorretLights = true;

