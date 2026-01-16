import * as THREE from "three";
import { Tween, Group } from "@tweenjs/tween.js";

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0); // 设置初始位置

// 创建一个 Group 来管理所有 tweens
const tweenGroup = new Group();

// 创建一段tween动画，经过2000毫秒，mesh位置从(0,0,0)变化到(100,50,0)
const tween = new Tween(mesh.position);
tween.to({ x: 100, y: 50 }, 2000);

// 将 tween 添加到组中
tweenGroup.add(tween);

// 启动 tween（直接调用 start）
tween.start();
export { mesh, tweenGroup };
