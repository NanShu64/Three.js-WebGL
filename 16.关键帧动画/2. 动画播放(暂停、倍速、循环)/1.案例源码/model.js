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

document.getElementById("stop").addEventListener("click", function () {
  clipAction.stop(); //动画停止结束，回到开始状态
});
document.getElementById("play").addEventListener("click", function () {
  clipAction.play(); //播放动画
});
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
    bu.innerHTML = "继续"; // 如果改变为暂停状态，按钮文字设置为“继续”
  }
});

//不循环播放
clipAction.loop = THREE.LoopOnce;
// 物体状态停留在动画结束的时候
clipAction.clampWhenFinished = true;
// clipAction.timeScale = 1;//默认
clipAction.timeScale = 2;//2倍速

const gui = new GUI(); //创建GUI对象
// 0~6倍速之间调节
gui.add(clipAction, "timeScale", 0, 6);



const clock = new THREE.Clock();

function loop() {
  requestAnimationFrame(loop);
  const frameT = clock.getDelta();
  // 更新播放器相关的时间
  mixer.update(frameT);
}
loop();

export default mesh1;
