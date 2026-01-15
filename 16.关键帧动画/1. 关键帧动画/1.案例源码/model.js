import * as THREE from "three";

const geometry = new THREE.BoxGeometry(15,15,15);
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

const clock = new THREE.Clock();

function loop() {
  requestAnimationFrame(loop);
  const frameT = clock.getDelta();
  // 更新播放器相关的时间
  mixer.update(frameT);
}
loop();



export default mesh1;
