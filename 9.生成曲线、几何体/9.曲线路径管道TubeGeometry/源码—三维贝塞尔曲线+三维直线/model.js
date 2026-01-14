import * as THREE from 'three';

// 创建多段线条的顶点数据
const p1 = new THREE.Vector3(0, 0,100)
const p2 = new THREE.Vector3(0, 0,30);
const p3 = new THREE.Vector3(0, 0,0);
const p4 = new THREE.Vector3(30, 0, 0);
const p5 = new THREE.Vector3(100, 0, 0);
// 1. 3D直线线段
const line1 = new THREE.LineCurve3(p1, p2);
// 2. 三维二次贝塞尔曲线
const curve = new THREE.QuadraticBezierCurve3(p2, p3, p4);
// 3. 3D直线线段
const line2 = new THREE.LineCurve3(p4, p5);

const CurvePath = new THREE.CurvePath(); 
// 三条线拼接为一条曲线
CurvePath.curves.push(line1, curve, line2); 

const pointsArr = CurvePath.getPoints(100); //曲线上获取点
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr); //读取坐标数据赋值给几何体顶点

// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0x00fffff
});
// 线模型
const line = new THREE.Line(geometry, material);


// 可视化p1、p2、p3、p4三个点的位置，并用直线相连接，便于观察贝塞尔曲线的绘制规律
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1, p2, p3, p4, p5]);
const material2 = new THREE.PointsMaterial({
    color: 0xff00ff,
    size: 10,
});
//点模型对象
const points = new THREE.Points(geometry2, material2);

const group = new THREE.Group();
group.add(line, points);

export default group;