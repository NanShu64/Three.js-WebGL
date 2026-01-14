import * as THREE from 'three';


const geometry = new THREE.CylinderGeometry(60, 60, 100, 30);
const material = new THREE.MeshLambertMaterial({
    color: 0x004444,
    transparent:true,
    opacity:0.8,
});
const mesh = new THREE.Mesh(geometry, material);


// const edges = new THREE.EdgesGeometry(geometry);
// 相邻面法线夹角大于30度，才会显示线条
const edges = new THREE.EdgesGeometry(geometry,30);
const edgesMaterial = new THREE.LineBasicMaterial({
  color: 0x00ffff,
})
const line = new THREE.LineSegments(edges, edgesMaterial);
mesh.add(line);



export default mesh;