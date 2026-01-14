import * as THREE from 'three';



// 参数1和2表示椭圆中心坐标  参数3和4表示x和y方向半径
const arc = new THREE.EllipseCurve(0, 0, 120, 50);


//getPoints是基类Curve的方法，平面曲线会返回一个vector2对象作为元素组成的数组
const pointsArr = arc.getPoints(50); //分段数50，返回51个顶点  
// const pointsArr = arc.getSpacedPoints(50);//曲线上等间距取点
// console.log('曲线上获取坐标',pointsArr);


const geometry = new THREE.BufferGeometry();
// 把数组pointsArr里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性
geometry.setFromPoints(pointsArr);
console.log('geometry.attributes',geometry.attributes);

// 点材质
const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10.0 //点对象像素尺寸
}); 
// 点模型
const points = new THREE.Points(geometry, material);

// // 线材质
// const material = new THREE.LineBasicMaterial({
//     color: 0xfffffff
// });
// // 线模型
// const line = new THREE.Line(geometry, material);

// export default line;
export default points;