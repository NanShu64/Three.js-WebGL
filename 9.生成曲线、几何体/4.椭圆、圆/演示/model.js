import * as THREE from 'three';



// 参数1和2表示椭圆中心坐标  参数3和4表示x和y方向半径
// const arc = new THREE.EllipseCurve(0, 0, 50, 50);

const arc = new THREE.ArcCurve(0, 0, 50,0,1*Math.PI/2,true);

//getPoints是基类Curve的方法，平面曲线会返回一个vector2对象作为元素组成的数组
// const pointsArr = arc.getPoints(50); //分段数50，返回51个顶点

const pointsArr = arc.getPoints(32);

const geometry = new THREE.BufferGeometry();
// 把数组pointsArr里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性
geometry.setFromPoints(pointsArr);

// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0x00fffff
});
// 线模型
const line = new THREE.Line(geometry, material);

export default line;