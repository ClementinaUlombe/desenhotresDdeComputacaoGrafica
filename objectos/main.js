import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import THREEx3 from 'three-x3';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Cena e Câmera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFF8E7); // Cor de leite

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-0.42, 41.99, 31.44);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Luzes
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 4);
hemisphereLight.position.set(0, 4, 0);
scene.add(hemisphereLight);

const spotLight = new THREE.SpotLight(0xFFFFFF, 10, 10, 0.5);
spotLight.position.set(0, 7, 2);
spotLight.castShadow = true;
scene.add(spotLight);

const configureShadows = (object) => {
    object.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
};

const controls = new OrbitControls(camera, renderer.domElement);

// Função para adicionar modelos GLTF com posição e escala
function addGLTFModel(path, scale, position, animationsCallback) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
        const model = gltf.scene;
        model.scale.set(scale[0], scale[1], scale[2]);
        model.position.set(position[0], position[1], position[2]);
        configureShadows(model);
        scene.add(model);

        // Adiciona ao THREEx3
        x3.add(model, { label: 'Modelo' });

        // Verifica se há animações no modelo carregado
        if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            animationsCallback(mixer, gltf.animations);
        }

        console.log(`${path} carregado e adicionado à cena`);
    }, undefined, (error) => {
        console.error(`Erro ao carregar ${path}:`, error);
    });
}

// Carregar o Modelo GLTF da Casa bayard_station_valve_house
addGLTFModel('/objectos/bayard_station_valve_house/scene.gltf', [1, 1, 1], [0, -8.78, 0], (mixer, animations) => {
    // Aqui você pode adicionar lógica de animação específica se necessário
});

// Carregar Animação GLTF do personagem feminino
let girlMixer; // Declaração do mixer para animação da menina
let girlActions = []; // Array para armazenar as ações de animação da menina
let activeGirlAction; // Ação ativa da menina

const loadGirlScene = () => {
    const girlLoader = new GLTFLoader();
    girlLoader.load('/objectos/game_character_girl._rigged_textured_animated/scene.gltf', (gltf) => {
        const girl = gltf.scene;
        girl.scale.set(5, 5, 5);
        girl.position.set(2, 0.44, 4.91); // Ajuste a posição para evitar conflito
        scene.add(girl);

        // Configurando o mixer para a animação da menina
        girlMixer = new THREE.AnimationMixer(girl);
        gltf.animations.forEach((clip) => {
            const action = girlMixer.clipAction(clip);
            girlActions.push(action);
        });

        // Definir a ação inicial
        if (girlActions.length > 0) {
            activeGirlAction = girlActions[0];
            activeGirlAction.play();
        }

        // Adiciona ao THREEx3
        x3.add(girl, { label: 'Menina' });

        console.log('Personagem menina carregado e adicionado à cena');
    }, undefined, (error) => {
        console.error('Erro ao carregar personagem menina:', error);
    });
};

loadGirlScene();

// Carregar Animação GLTF do pterodáctilo
let pteroMixer; // Declaração do mixer para animação do pterodáctilo

const loadPteroScene = () => {
    const pteroLoader = new GLTFLoader();
    pteroLoader.load('/objectos/animated_flying_pteradactal_dinosaur_loop/scene.gltf', (gltf) => {
        const ptero = gltf.scene;
        ptero.scale.set(10, 10, 10); // Ajustando a escala para 10, 10, 10
        ptero.position.set(0, 13.06, 0); // Ajustando a posição conforme necessário
        scene.add(ptero);

        // Configurando o mixer para a animação do pterodáctilo
        pteroMixer = new THREE.AnimationMixer(ptero);
        gltf.animations.forEach((clip) => {
            const action = pteroMixer.clipAction(clip);
            action.play();
        });

        // Adiciona ao THREEx3
        x3.add(ptero, { label: 'Pterodáctilo' });

        console.log('Pterodáctilo carregado e adicionado à cena');
    }, undefined, (error) => {
        console.error('Erro ao carregar pterodáctilo:', error);
    });
};

loadPteroScene();

// Carregar Animação GLTF do APC Low Poly
let apcMixer; // Declaração do mixer para animação do APC Low Poly

const loadAPCScene = () => {
    const apcLoader = new GLTFLoader();
    apcLoader.load('/objectos/apc_low_poly_animated/scene.gltf', (gltf) => {
        const apc = gltf.scene;
        apc.scale.set(0.5, 0.5, 0.5); // Ajustando a escala para 0.5, 0.5, 0.5
        apc.position.set(-30, 0, -20); // Ajustando a posição conforme necessário
        scene.add(apc);

        // Configurando o mixer para a animação do APC Low Poly
        apcMixer = new THREE.AnimationMixer(apc);
        gltf.animations.forEach((clip) => {
            const action = apcMixer.clipAction(clip);
            action.play();
        });

        // Adiciona ao THREEx3
        x3.add(apc, { label: 'APC Low Poly' });

        console.log('APC Low Poly carregado e adicionado à cena');
    }, undefined, (error) => {
        console.error('Erro ao carregar APC Low Poly:', error);
    });
};

loadAPCScene();

// Carregar Animação GLTF do gato (cat)
let catMixer; // Declaração do mixer para animação do gato

const loadCatScene = () => {
    const catLoader = new GLTFLoader();
    catLoader.load('/objectos/cat (2)/scene.gltf', (gltf) => {
        const cat = gltf.scene;
        cat.scale.set(0.08, 0.2, 0.3); // Ajustando a escala para 20, 20, 20
        cat.position.set(-14.8, 1.03 ,20.51); // Ajustando a posição conforme necessário
        scene.add(cat);

        // Configurando o mixer para a animação do gato
        catMixer = new THREE.AnimationMixer(cat);
        gltf.animations.forEach((clip) => {
            const action = catMixer.clipAction(clip);
            action.play();
        });

        // Adiciona ao THREEx3
        x3.add(cat, { label: 'Gato' });

        console.log('Gato carregado e adicionado à cena');
    }, undefined, (error) => {
        console.error('Erro ao carregar gato:', error);
    });
};

loadCatScene();

// Carregar Animação GLTF do AT-TE Walker
let walkerMixer; // Declaração do mixer para animação do AT-TE Walker

const loadWalkerScene = () => {
    const walkerLoader = new GLTFLoader();
    walkerLoader.load('/objectos/at-te_walker_animated/scene.gltf', (gltf) => {
        const walker = gltf.scene;
        walker.scale.set(1, 1, 1); 
        walker.position.set(26.35, 0, 16.05); 
        scene.add(walker);

        // Configurando o mixer para a animação do AT-TE Walker
        walkerMixer = new THREE.AnimationMixer(walker);
        gltf.animations.forEach((clip) => {
            const action = walkerMixer.clipAction(clip);
            action.play();
        });

        // Adiciona ao THREEx3
        x3.add(walker, { label: 'AT-TE Walker' });

        console.log('AT-TE Walker carregado e adicionado à cena');
    }, undefined, (error) => {
        console.error('Erro ao carregar AT-TE Walker:', error);
    });
};

loadWalkerScene();

// Plano de Chão
const groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(78, 62),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('/sobjectos/imagens/relva.jpg'),
        side: THREE.DoubleSide
    })
);
groundPlane.rotation.x = THREE.MathUtils.degToRad(-90);
groundPlane.receiveShadow = true;
scene.add(groundPlane);

const x3 = new THREEx3({
    THREE: THREE,
    OrbitControls: OrbitControls,
    camera: camera,
    renderer: renderer,
    scene: scene,
}, {
    grid: { visible: false },
    axes: { visible: false }
});

x3.add(groundPlane, { label: 'Plano' });
x3.add(spotLight, { label: 'Luz', helper: { visible: false } });
x3.add(hemisphereLight, { label: 'Luz Emisférica' });
x3.add(camera);

const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
    x3.tick();
    x3.fps(() => {
        const delta = clock.getDelta();
        if (girlMixer) girlMixer.update(delta); // Atualizando o mixer da menina
        if (pteroMixer) pteroMixer.update(delta); // Atualizando o mixer do pterodáctilo
        if (catMixer) catMixer.update(delta); // Atualizando o mixer do gato
        if (walkerMixer) walkerMixer.update(delta); // Atualizando o mixer do AT-TE Walker
        if (apcMixer) apcMixer.update(delta); // Atualizando o mixer do APC Low Poly
        renderer.render(scene, camera);
    });
});

renderer.physicallyCorrectLights = true;
