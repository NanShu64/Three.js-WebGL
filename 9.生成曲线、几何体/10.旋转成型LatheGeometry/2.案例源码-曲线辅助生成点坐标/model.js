import * as THREE from 'three';

// 通过三个点定义一个二维样条曲线
const curve = new THREE.SplineCurve([
    new THREE.Vector2(50, 60),
    new THREE.Vector2(25, 0),
    new THREE.Vector2(50, -60)
]);
//曲线上获取点,作为旋转几何体的旋转轮廓
const pointsArr = curve.getPoints(50); 
console.log('旋转轮廓数据',pointsArr);
// LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
const geometry = new THREE.LatheGeometry(pointsArr, 30);

const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide //两面可见
});
const mesh = new THREE.Mesh(geometry, material);


export default mesh;