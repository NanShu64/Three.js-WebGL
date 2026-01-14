import * as THREE from "three";

const model = new THREE.Group();

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x004444,
  transparent: true,
  opacity: 0.8,
});

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // 沿着x轴分布
    mesh.position.set(i * 200, 0, j * 200);

    model.add(mesh); //网格模型添加到model组中

    // 长方体作为EdgesGeometry参数创建一个新的几何体
    const edges = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
    });
    const line = new THREE.LineSegments(edges, edgesMaterial);
    mesh.add(line);
  }
}
export default model;
