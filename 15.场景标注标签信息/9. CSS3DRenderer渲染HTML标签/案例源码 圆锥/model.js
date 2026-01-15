import * as THREE from "three";

// 引入CSS2模型对象CSS2DObject
// import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
// 引入CSS3模型对象CSS3DObject
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
// 引入CSS3精灵模型对象CSS3DSprite
import { CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js';

const geometry = new THREE.ConeGeometry(25, 80);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(50, 0, 50);
// 可视化模型的局部坐标系
const axesHelper = new THREE.AxesHelper(100);
mesh.add(axesHelper);

// mesh设置一个父对象meshGroup
const meshGroup = new THREE.Group();
meshGroup.add(mesh);
// mesh位置受到父对象局部坐标.positionn影响
meshGroup.position.x = -100;

// const div = document.getElementById("tag");
// // HTML元素转化为threejs的CSS2模型对象
// const tag = new CSS2DObject(div);
// //y轴正方向，平移高度一半
// geometry.translate(0, 40, 0); 
// //圆锥mesh局部坐标系原点在自己底部时候，标签需要向上偏移圆锥自身高度
// tag.position.y += 80; 
// const div = document.getElementById("tag");
// // HTML元素转化为threejs的CSS3模型对象
// const tag = new CSS3DObject(div);
// //标签tag作为mesh子对象，默认标注在模型局部坐标系坐标原点
// mesh.add(tag);
// // 相对父对象局部坐标原点偏移80,刚好标注在圆锥
// tag.position.y += 80;
const div = document.getElementById("tag");
// HTML元素转化为threejs的CSS3精灵模型`CSS3DSprite`
const tag = new CSS3DSprite(div);
// new CSS3DObject(div);之后设置style.pointerEvents 
div.style.pointerEvents = 'none';
//标签tag作为mesh子对象，默认标注在模型局部坐标系坐标原点
mesh.add(tag);
// 相对父对象局部坐标原点偏移80,刚好标注在圆锥
tag.position.y += 80;

const group = new THREE.Group();

//标签tag作为mesh子对象，默认受到父对象位置影响
mesh.add(tag);

// group.add(meshGroup, tag);
group.add(meshGroup);

export default group;
