// 引入Three.js
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import {
    GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group();

loader.load("../建筑模型.gltf", function (gltf) {
    // 递归遍历
    gltf.scene.traverse(function (obj) {
        if (obj.isMesh) {

        }
    });
    model.add(gltf.scene);
})


export default model;