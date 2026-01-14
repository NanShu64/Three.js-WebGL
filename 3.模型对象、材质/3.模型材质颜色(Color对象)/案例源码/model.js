import * as THREE from "three";

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0xffff00,
});
const mesh = new THREE.Mesh(geometry, material);

// 浏览器控制台查看材质颜色属性的属性值
console.log("material.color", material.color);

// 十六进制颜色
material.color.set(0x00ff00);
// 创建一个颜色对象
const color = new THREE.Color(); //默认是纯白色0xffffff。
console.log("查看颜色对象结构", color); //可以查看rgb的值


// color.setRGB(0,1,0);//RGB方式设置颜色
// color.setHex(0x00ff00);//十六进制方式设置颜色
// color.setStyle('#00ff00');//前端CSS颜色值设置颜色


// 前端CSS风格颜色值：'#00ff00'、'rgb(0,255,0)'等形式
// material.color.set('#00ff00');
// material.color.set('rgb(0,255,0)');

export default mesh;
