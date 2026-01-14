import * as THREE from 'three';


const shape = new THREE.Shape();
// console.log('currentPoint',shape.currentPoint);
shape.moveTo(10, 0); //.currentPoint变为(10,0)
// 绘制直线线段，起点(10,0)，结束点(100,0)
shape.lineTo(100, 0);//.currentPoint变为(100, 0)
shape.lineTo(100, 100);
shape.lineTo(10, 100);


const geometry = new THREE.ShapeGeometry(shape);

// const geometry = new THREE.ExtrudeGeometry(shape, {
//     depth:20,//拉伸长度
//     bevelEnabled:false,//禁止倒角
// });
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    // wireframe:true
});
const mesh = new THREE.Mesh(geometry, material);


export default mesh;