// 引入Three.js
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("../地形.glb", function (gltf) { 
    model.add(gltf.scene); 
    const mesh = gltf.scene.children[0];//山脉网格模型
    //顶点位置数据
    const pos = mesh.geometry.attributes.position;
    const count = pos.count;//顶点数量
})


export default model;
