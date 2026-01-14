// 引入three.js
import * as THREE from 'three';

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 25, 0, //顶点3坐标
]);
// 顶点位置数据
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

//类型数组创建顶点颜色color数据
const colors = new Float32Array([
    1, 0, 0, //顶点1颜色 
    0, 0, 1, //顶点2颜色
    0, 1, 0, //顶点3颜色
]);
// 设置几何体attributes属性的颜色color属性
//3个为一组,表示一个顶点的颜色数据RGB
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); 


// 线模型渲染几何体顶点颜色，可以看到直线颜色渐变效果
const material = new THREE.LineBasicMaterial({
    vertexColors:true,//默认false，设置为true表示使用顶点颜色渲染
});
const line = new THREE.Line(geometry, material);

export default line;