// 引入Three.js
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import {
    GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); 

loader.load("../地形.glb", function (gltf) { 
    model.add(gltf.scene); 
    //mesh表示地形网格模型
    const mesh = gltf.scene.children[0];

})


export default model;