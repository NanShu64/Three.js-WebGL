import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../../骨骼动画.glb", function (gltf) {
  console.log("控制台查看gltf对象结构", gltf);
  model.add(gltf.scene);
  // 骨骼辅助显示
  // const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
  // model.add(skeletonHelper);

  // 根据骨骼关节名字获取骨关节Bone
  // 在三维软件中，骨骼关节层层展开，可以看到下面三个骨骼关节
  // const bone1 = gltf.scene.getObjectByName("mixamorig:Hips");
  // const bone2 = gltf.scene.getObjectByName("Ctrl_Hand_IK_Left"); //关节2
  // const bone3 = gltf.scene.getObjectByName("Ctrl_ArmPole_IK_Right"); //关节3
  // console.log("关节1", bone1);
  // console.log("关节2", bone2);
  // console.log("关节3", bone3);

  // bone1.rotation.x = Math.PI / 6; //关节1旋转
  // bone2.rotation.x = Math.PI / 6; //关节2旋转
  // bone3.rotation.x = Math.PI / 6; //关节3旋转

  // 根据节点名字获取某个骨骼网格模型
  // const SkinnedMesh = gltf.scene.getObjectByName("mixamorig:Head");
  // console.log("骨骼网格模型", SkinnedMesh);
  // console.log("骨架", SkinnedMesh.skeleton);
  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  // gltf.animations[0]休息
  // gltf.animations[1]休息
  // gltf.animations[2]走路
  // gltf.animations[3]跑
  const clipAction = mixer.clipAction(gltf.animations[3]);
  clipAction.play(); //播放动画
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
