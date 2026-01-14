// 引入Three.js
import * as THREE from "three";

const group = new THREE.Group();

const texture = new THREE.TextureLoader().load("./光点.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture, //设置精灵纹理贴图
});
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(20, 20, 1); //只需要设置x、y两个分量就可以
sprite.position.set(0, 100, -20); //设置位置，要考虑sprite尺寸影响
group.add(sprite);

const sprite1 = sprite.clone();
sprite1.material = sprite.material.clone();
sprite1.material.color.set(0xff0000); //设置精灵颜色
sprite1.scale.set(20, 20, 1);
sprite1.position.set(0, 100, 20);
group.add(sprite1);

const geometry = new THREE.BoxGeometry(25, 100, 50);
geometry.translate(0, 50, 0);
const material = new THREE.MeshBasicMaterial({
  color: 0x90a4ae, //设置颜色
});
// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const mesh = new THREE.Mesh(geometry, material);
group.add(mesh);

sprite.change = function () {
  mesh.material.color.set(0xffff00);
};
sprite1.change = function () {
  mesh.material.color.set(0xff0000);
};

export {group, sprite, sprite1}; ;