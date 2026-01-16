import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
// 单独.glb文件
loader.load("../../鸟.glb", function (gltf) {
  model.add(gltf.scene);
  console.log(gltf);
  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  //  获取gltf.animations[0]的第一个clip动画对象
  const clipAction = mixer.clipAction(gltf.animations[1]); //创建动画clipAction对象
  clipAction.play(); //播放动画
  // clipAction.loop = THREE.LoopOnce;
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
