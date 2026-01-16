import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
const gui = new GUI();

const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
loader.load("../../猴头.glb", function (gltf) {
  console.log("控制台查看gltf对象结构", gltf);
  model.add(gltf.scene);
  // 访问网格模型
  const mesh = gltf.scene.children[0];
  // 获取所有变形目标的顶点数据
  const tArr = mesh.geometry.morphAttributes.position;
  console.log("所有变形目标", tArr);
  console.log("所有权重", mesh.morphTargetInfluences);

  // 每个变形目标对应的含义(注意和变形目标对应起来)
  const nameArr = ["耳朵变尖", "头顶变高", "眉毛变高"];
  // GUI拖动条可视化改变变形目标权重系数
  const obj = {};
  for (let i = 0; i < tArr.length; i++) {
    obj["t" + i] = 0; //obj批量定义一个属性表示变性目标的权重系数
    //   // 批量设置要改变的obj属性，对应name名字，和对应权重
    gui
      .add(obj, "t" + i, 0, 1)
      .name(nameArr[i])
      .onChange(function (v) {
        mesh.morphTargetInfluences[i] = v;
      });
  }

  // 创建变形动画权重系数的关键帧数据
  mesh.name = "per"; //关键帧动画控制的模型对象命名
  // 设置变形目标1对应权重随着时间的变化
  const KF1 = new THREE.KeyframeTrack(
    "per.morphTargetInfluences[0]",
    [0, 5],
    [0, 1]
  );
  // 生成关键帧动画
  const clip = new THREE.AnimationClip("t", 5, [KF1]);

  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  const clipAction = mixer.clipAction(clip);
  clipAction.play();

  const clock = new THREE.Clock();
  function loop() {
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    // 更新播放器相关的时间
    mixer.update(frameT);
  }
  loop();
});

export default model;
