void setup(){
  size(600,600);
  //noLoop();
  frameRate(10);
}

void draw(){
  background(#121212);
  stroke(230);
  strokeWeight(3);
  noFill();
  //noStroke();
  
  ellipseMode(CENTER);
  
  
  shapeMode(CORNER);
  rect(100, 100, 400, 400);
  //fill(200);
  //analogEffect(500, 500, 9);
  drawGrit(100, 100, 400, 400, 9); 
}


/*
rand nums for height and width of area to contain rand shape

rand nums for num of vertices in the shape

rand coords for each vertice
and randomize whether it will be normal or bezier
  if bezier must have random points for the anchor points
*/


//returns the new upper right corner of the rectangle by centering the rectangle on the x and y coords
float[] centeredUpperRight(float x, float y, float w, float h){
  float[] coords = {x-(w/2), y-(h/2)};
  return coords;
}


void analogEffect(float area, int population, int detail){

  for (int i = 0; i < population; i++){
    float w;
    float h;
    if (random(1) > 0.5) {
       w = random(area, area);
       h = w;
       println("true");
    }
    else {
       h = random(area, area);
       w = h;    
       println("false");
    }
    println("h: " + h);
    println("w: " + w);
    drawGrit(int(random(width)), int(random(height)), -w, -h, detail);
    println("h: " + h);
    println("w: " + w);
  }
}

void drawGrit(int x, int y, float areaX, float areaY, int detail){
  int verts = int(random(3, detail));
  println(verts);
  beginShape();
  float inPointX = int(random(x, x + areaX)); 
  println("initial " + inPointX);
  float inPointY = int(random(y, y + areaY));
  println("initial " + inPointY);
  float prevX = inPointX;
  float prevY = inPointY;
  vertex(inPointX, inPointY);
  for (int i = 0; i < verts; i++){ 
    float pointx = random(x, x + areaX);
    float pointy = random(y, y + areaY);
    ellipse(pointx, pointy, 5, 5);
    if (random(1) > 0.5) {
      vertex(pointx, pointy);
    }
    else {
      bezierVertex(prevX+random(1-11), prevY+random(1-11), pointx+random(1-11), pointy+random(1-11), pointx , pointy); 
    }
  }
  vertex(inPointX, inPointY);
  endShape();
}
