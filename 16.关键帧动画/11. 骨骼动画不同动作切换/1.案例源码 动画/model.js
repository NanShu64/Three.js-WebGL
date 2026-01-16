import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../../骨骼动画.glb", function (gltf) {
  model.add(gltf.scene);

  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  // gltf.animations[0]休息
  // gltf.animations[1]休息
  // gltf.animations[2]走路
  // gltf.animations[3]跑

  const IdleAction = mixer.clipAction(gltf.animations[0]);
  const IdleAction1 = mixer.clipAction(gltf.animations[1]);
  const RunAction = mixer.clipAction(gltf.animations[3]);
  const WalkAction = mixer.clipAction(gltf.animations[2]);

  IdleAction.play();
  IdleAction1.play();
  RunAction.play();
  WalkAction.play();

  // 跑步和走路动画对人影响程度为0，人处于休闲状态
  IdleAction.weight = 1.0;
  IdleAction1.weight = 0.0;
  RunAction.weight = 0.0;
  WalkAction.weight = 0.0;

  let ActionState = IdleAction; //当前处于播放状态的动画动作对象

  // 通过UI按钮控制，切换动画运动状态
  document.getElementById("Idle1").addEventListener("click", function () {
    ActionState.weight = 0.0; //播放状态动画权重设置为0
    IdleAction.weight = 1.0;
    ActionState = IdleAction;
  });
  document.getElementById("Idle2").addEventListener("click", function () {
    ActionState.weight = 0.0; //播放状态动画权重设置为0
    IdleAction1.weight = 1.0;
    ActionState = IdleAction;
  });
  document.getElementById("Run").addEventListener("click", function () {
    ActionState.weight = 0.0; //播放状态动画权重设置为0
    RunAction.weight = 1.0;
    ActionState = RunAction;
  });
  document.getElementById("Walk").addEventListener("click", function () {
    ActionState.weight = 0.0; //播放状态动画权重设置为0
    WalkAction.weight = 1.0;
    ActionState = WalkAction;
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
