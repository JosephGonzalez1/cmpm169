// sketch.js - my random text p5.js sketch
// Author: Joseph Gonzalez
// Date: 2/20/2025
// done with the help of chat.gpt

'use strict';

var joinedText;
var treemap;
var font;
var colors = [];

function preload() {
  font = loadFont('data/miso-bold.ttf');
  joinedText = loadStrings('data/pride_and_prejudice.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  joinedText = joinedText.join(' ');
  var words = joinedText.match(/\w+/g).filter(w => w.length < 10);

  treemap = new gd.Treemap(1, 1, width - 3, height - 3, {
    sort: false, 
    direction: random(['horizontal', 'vertical', 'both']),
    padding: 2,
    ignore: []
  });

  var subTreemaps = [];
  shuffle(words, true);

  for (var i = 0; i < words.length; i++) {
    var w = words[i].toLowerCase();
    var index = w.length;
    if (index < 10) {
      var t = subTreemaps[index];
      if (!t) {
        t = treemap.addTreemap(index);
        subTreemaps[index] = t;
      }
      t.addData(w);
    }
  }

  for (let i = 0; i < 10; i++) {
    colors.push(color(random(100, 255), random(100, 255), random(100, 255), random(150, 255)));
  }

  treemap.calculate();
}

function draw() {
  background(20);
  textAlign(CENTER, BASELINE);
  strokeWeight(1);

  for (var i = 0; i < treemap.items.length; i++) {
    var subTreemap = treemap.items[i];
    if (!subTreemap.ignored) {
      for (var j = 0; j < subTreemap.items.length; j++) {
        var item = subTreemap.items[j];

        let jitterX = random(-5, 5);
        let jitterY = random(-5, 5);
        let angle = random(-15, 15);
        let chosenColor = random(colors);
        let fontStyle = random([ITALIC, BOLD, NORMAL]);

        noFill();
        stroke(chosenColor);
        rect(item.x + jitterX, item.y + jitterY, item.w, item.h);

        var word = subTreemap.items[j].data;
        textFont(font, 100);
        var textW = textWidth(word);
        var fontSize = 100 * (item.w * 0.9) / textW;
        fontSize = min(fontSize, (item.h * 0.9));
        textFont(font, fontSize);
        textStyle(fontStyle);

        push();
        translate(item.x + item.w / 2 + jitterX, item.y + item.h * 0.8 + jitterY);
        rotate(radians(angle));
        fill(chosenColor);
        noStroke();
        text(word, 0, 0);
        pop();
      }
    }
  }

  noLoop();
}



