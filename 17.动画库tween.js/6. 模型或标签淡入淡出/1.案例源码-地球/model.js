import * as THREE from "three";
import { Tween, Group, Easing } from "@tweenjs/tween.js";
const geometry = new THREE.SphereGeometry(100); //球体

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./earth.jpg");
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});

// 创建一个 Group 来管理所有 tweens
const tweenGroup = new Group();

// const tween = new Tween({ opacity: material.opacity })
//   .to({ opacity: 1.0 }, 3000)
//   .onUpdate(function (obj) {
//     material.opacity = obj.opacity;
//   })
//   .onComplete(function () {
//     //动画结束：关闭允许透明，恢复到模型原来状态
//     material.transparent = false;
//   })
//   .easing(Easing.Quadratic.Out) //使用二次缓动函数
//   .start();

const tween = new Tween({ opacity: material.opacity })
  .to({ opacity: 0.0 }, 3000)
  .onStart(function () {
    //动画开始：允许透明opacity属性才能生效
    material.transparent = true;
  })
  .onUpdate(function (obj) {
    material.opacity = obj.opacity;
  })
  .easing(Easing.Quadratic.Out) //使用二次缓动函数
  .start();



  
const mesh = new THREE.Mesh(geometry, material);
material.map = texture; //也可以通过map属性直接设置，材质的参数设置一样

// 将 tween 添加到组中
tweenGroup.add(tween);

export { mesh,tweenGroup };
