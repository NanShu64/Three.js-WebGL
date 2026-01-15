import * as THREE from "three";
function createSprite(obj, state) {
  const texLoader = new THREE.TextureLoader();
  let texture = null;

  if (state == "警告") {
    texture = texLoader.load("./警告.png");
  } else {
    texture = texLoader.load("./提示.png");
  }
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  const sprite = new THREE.Sprite(spriteMaterial);

  sprite.scale.set(5, 5, 1);
  sprite.position.y = 5 / 2; 

  obj.add(sprite);
}
export default createSprite;
