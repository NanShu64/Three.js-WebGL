import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
// 单独.glb文件
loader.load("../../机械拆装.glb", function (gltf) {
  // 递归遍历所有模型节点批量修改材质
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      obj.material.metalness = 1.0; //金属度
      obj.material.roughness = 0.5; //表面粗糙度
    }
  });
  model.add(gltf.scene);
  console.log(gltf);
  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  //  获取gltf.animations[0]的第一个clip动画对象
  const clip = gltf.animations[0];
  const clipAction = mixer.clipAction(clip); //创建动画clipAction对象
  clipAction.play(); //播放动画
  clipAction.paused = true; //暂停状态

  const gui = new GUI(); //创建GUI对象
  gui.add(clipAction, "time", 0, 12).step(0.05);

  const bu = document.getElementById("bu");
  bu.addEventListener("click", function () {
    // AnimationAction.paused默认值false，设置为true，可以临时暂停动画
    if (clipAction.paused) {
      //暂停状态
      clipAction.paused = false; //切换为播放状态
      bu.innerHTML = "暂停"; // 如果改变为播放状态，按钮文字设置为“暂停”
    } else {
      //播放状态
      clipAction.paused = true; //切换为暂停状态
      bu.innerHTML = "播放"; // 如果改变为暂停状态，按钮文字设置为“播放”
    }
  });
  clipAction.loop = THREE.LoopOnce;
  // 动画播放完成事件
  mixer.addEventListener("finished", function () {
    bu.innerHTML = "播放"; //播放完成，按钮显示为“播放”
    clipAction.reset(); //重新开始新的动画播放
    clipAction.paused = true; //切换为暂停状态
  });
  // 如果想播放动画,需要周期性执行`mixer.update()`更新AnimationMixer时间数据
  const clock = new THREE.Clock();
  function loop() {
    requestAnimationFrame(loop);
    //clock.getDelta()方法获得loop()两次执行时间间隔
    const frameT = clock.getDelta();
    // 更新播放器相关的时间
    mixer.update(frameT);
  }
  loop();
});

export default model;
