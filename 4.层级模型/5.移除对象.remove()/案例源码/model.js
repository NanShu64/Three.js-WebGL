// 引入three.js
import * as THREE from 'three';

// 创建一个层级模型对象

//创建两个网格模型mesh1、mesh2
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshLambertMaterial({color: 0xffffff});
const group = new THREE.Group();
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.translateX(25);
//把mesh1型插入到组group中，mesh1作为group的子对象
group.add(mesh1);
//把mesh2型插入到组group中，mesh2作为group的子对象
group.add(mesh2);

// 删除父对象group的子对象网格模型mesh1
// group.remove(mesh1);

group.remove(mesh1,mesh2);//一次移除多个子对象

export default group;
