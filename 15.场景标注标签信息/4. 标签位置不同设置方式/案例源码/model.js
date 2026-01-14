import * as THREE from "three";

// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";



const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(50, 0, 50);

// mesh设置一个父对象meshGroup
const meshGroup = new THREE.Group();
meshGroup.add(mesh);
// mesh位置受到父对象局部坐标.positionn影响
meshGroup.position.x = -100;


const div = document.getElementById("tag");
// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(div);

// const worldPosition = new THREE.Vector3();
// // 获取mesh的世界坐标(meshGroup.position和mesh.position累加结果)
// mesh.getWorldPosition(worldPosition);
// // mesh世界坐标复制给tag
// tag.position.copy(worldPosition);

// tag.position.set(50, 0, 50);
const pos = geometry.attributes.position;
// 获取几何体顶点1的xyz坐标，设置标签局部坐标.position属性
tag.position.set(pos.getX(0), pos.getY(0), pos.getZ(0));

const group = new THREE.Group();

//标签tag作为mesh子对象，默认受到父对象位置影响
mesh.add(tag);

// group.add(meshGroup, tag);
group.add(meshGroup);

export default group;
