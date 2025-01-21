// sketch.js - purpose and description here
// Author: Joseph Gonzalez
// Date: 1/20/2025

function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(250);
  rotateY(frameCount * 0.01);

normalMaterial();
  for (let j = 0; j < 5; j++) {
    push();
    for (let i = 0; i < 80; i++) {
      translate(
        sin(frameCount * 0.001 + j) * 100,
        cos(frameCount * 0.001 + j) * 100,
        i * 0.1
      );
      rotateZ(frameCount * 0.002);
      push();
      plane(6,8,10);
      pop();
    }
    pop();
  }
}