import * as THREE from 'three';

// 下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0),半径50。
const shape = new THREE.Shape();
shape.lineTo(100, 0); //.currentPoint变为(100,0)
// absarc圆心坐标不受到.currentPoint影响，以坐标原点作为参考
shape.absarc(100,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
console.log('currentPoint',shape.currentPoint);
shape.lineTo(0, 50);


const geometry = new THREE.ShapeGeometry(shape, 20);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    // wireframe:true,//辅助观察三角形计算结果
});
const mesh = new THREE.Mesh(geometry, material);


export default mesh;