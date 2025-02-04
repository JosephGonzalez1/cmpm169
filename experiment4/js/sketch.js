// sketch.js - my image distortion p5.js sketch
// Author: Joseph Gonzalez
// Date: 2/3/2025
// done with the help of chat.gpt

'use strict';

var img;

function preload() {
  img = loadImage('data/pic.png');
}

function setup() {
  createCanvas(1024, 780);
  image(img, 0, 100);
}

function draw() {
  if (frameCount % 5 === 0) { 

   
    var x1 = floor(random(width));
    var y1 = 50;
    var x2 = round(x1 + random(-50, 50)); 
    var y2 = round(y1 + random(-30, 30));
    var w = floor(random(50, 150));
    var h = height - 100;
    set(x2, y2, get(x1, y1, w, h));

    var x3 = floor(random(width));
    var y3 = floor(random(height));
    var x4 = round(x3 + random(-80, 80));
    var y4 = round(y3 + random(-50, 50));
    var w2 = floor(random(100, 300));
    var h2 = floor(random(100, 200));
    set(x4, y4, get(x3, y3, w2, h2));
  }
}

