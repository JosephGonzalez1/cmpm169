// sketch.js - my Flower Blossom p5.js sketch
// Author: Joseph Gonzalez
// Date: 2/15/2025
// done with the help of chat.gpt

let angle;

function setup() {
  createCanvas(710, 400, WEBGL);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  rotateX(frameCount * 0.25);
  rotateZ(frameCount * 0.25);

  angle = (mouseX / width) * 90;
  angle = min(angle, 90);

  translate(0, 150, 0);

  stroke(0, 255, 255);
  line(0, 0, 0, 0, -120, 0);

  translate(0, -120, 0);

  branch(120, 0);
}

function branch(h, level) {
  stroke(level * 25, 255, 255);
  h *= 0.66;

  if (h > 2) {
    push();
    rotateX(angle);
    line(0, 0, 0, 0, -h, 0);
    translate(0, -h, 0);
    branch(h, level + 1);
    pop();

    push();
    rotateX(-angle);
    line(0, 0, 0, 0, -h, 0);
    translate(0, -h, 0);
    branch(h, level + 1);
    pop();
  }
}


