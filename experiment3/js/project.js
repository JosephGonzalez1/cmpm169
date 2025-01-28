// project.js - my snow falling p5.js project
// Author: Joseph Gonzalez
// Date: 1/27/2025

let maxCount = 5000; 
let currentCount = 1;
let circles = []; 

function setup() {
  createCanvas(800, 800);
  fill(240);
  noStroke();


  circles.push(new AggregationCircle(width / 2, height / 2, 10));
}

function draw() {
  background('rgb(35,191,206)');

  if (currentCount < maxCount) {
    let newR = random(1, 7);
    let newX = random(newR, width - newR);
    let newY = random(newR, height - newR);

    let closestDist = Number.MAX_VALUE;
    let closestIndex = 0;

    for (let i = 0; i < circles.length; i++) {
      let newDist = dist(newX, newY, circles[i].x, circles[i].y);
      if (newDist < closestDist) {
        closestDist = newDist;
        closestIndex = i;
      }
    }

    let angle = atan2(newY - circles[closestIndex].y, newX - circles[closestIndex].x);

    let newCircle = new AggregationCircle(
      circles[closestIndex].x + cos(angle) * (circles[closestIndex].r + newR),
      circles[closestIndex].y + sin(angle) * (circles[closestIndex].r + newR),
      newR
    );
    circles.push(newCircle);
    currentCount++;
  }

  for (let circle of circles) {
    circle.update();
    circle.display();
  }
}

function AggregationCircle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.creationTime = millis(); 
  this.isFalling = false;
  this.fallSpeed = random(1, 3);
  this.initialAngle = random(0, TWO_PI); 
  this.angleVelocity = random(0.02, 0.05); 

  this.update = function() {
    if (!this.isFalling && millis() - this.creationTime > 5000) {
      this.isFalling = true;
    }

    if (this.isFalling) {
      this.y += this.fallSpeed;

      this.x += sin(this.initialAngle) * 2; 
      this.initialAngle += this.angleVelocity;

      if (this.y > height) {
        this.y = random(-50, 0);
        this.isFalling = false;
        this.creationTime = millis(); 
      }
    }
  };

  this.display = function() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  };
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('falling_swaying_aggregation', 'png');
}
