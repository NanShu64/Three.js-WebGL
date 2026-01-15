import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
const geometry = new THREE.BoxGeometry(15, 15, 15);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const mesh1 = new THREE.Mesh(geometry, material);

// 给需要设置关键帧动画的模型命名
mesh1.name = "Box";
const times = [0, 3, 6]; //时间轴上，设置三个时刻0、3、6秒
// times中三个不同时间点，物体分别对应values中的三个xyz坐标
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];
// 0~3秒，物体从(0,0,0)逐渐移动到(100,0,0),3~6秒逐渐从(100,0,0)移动到(0,0,100)
const posKF = new THREE.KeyframeTrack("Box.position", times, values);
// 从2秒到5秒，物体从红色逐渐变化为蓝色
const colorKF = new THREE.KeyframeTrack(
  "Box.material.color",
  [2, 5],
  [1, 0, 0, 0, 0, 1]
);
// 1.3 基于关键帧数据，创建一个clip关键帧动画对象，命名"test"，持续时间6秒。
const clip = new THREE.AnimationClip("test", 6, [posKF, colorKF]);

//包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
const mixer = new THREE.AnimationMixer(mesh1);

//AnimationMixer的`.clipAction()`返回一个AnimationAction对象
const clipAction = mixer.clipAction(clip);
//.play()控制动画播放，默认循环播放
clipAction.play();

//不循环播放
clipAction.loop = THREE.LoopOnce;
// 物体状态停留在动画结束的时候
clipAction.clampWhenFinished = true;

clipAction.timeScale = 3; //3倍速
//在暂停情况下，设置.time属性,把动画定位在任意时刻
clipAction.paused = true;
//AnimationAction设置开始播放时间：从1秒时刻对应动画开始播放
// clipAction.time = 1;
clipAction.time = 3; //物体状态为动画3秒对应状态
//AnimationClip设置播放结束时间：到5秒时刻对应的动画状态停止
clip.duration = 5;

const gui = new GUI(); //创建GUI对象
gui.add(clipAction, "time", 0, 6).step(0.1);

const bu = document.getElementById("bu");
bu.addEventListener("click", function () {
  clipAction.time += 0.1;
});

const clock = new THREE.Clock();

function loop() {
  requestAnimationFrame(loop);
  const frameT = clock.getDelta();
  // 更新播放器相关的时间
  mixer.update(frameT);
}
loop();

export default mesh1;
