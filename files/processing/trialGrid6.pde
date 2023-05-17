int count = 0;
void setup(){
  size(600,600);
  //noLoop();
  frameRate(10);
}

void draw(){
  background(#111111);
  stroke(0);
  //strokeWeight(10);
  //noFill();
 // fill(#f1f1f1);
  ellipseMode(CENTER);
  fill(color(random(0, 200),random(150, 200),random(0, 200)));

  

 
  shapeMode(CORNER);
  int num = int(map(mouseX, 0, width-20, 2, 40));
  drawGrid(num, num, 50); 
  

  

}

void drawRow(int numColumns, float y, float h, float border) {
    float sizeW = (float(width) - border*2) / float(numColumns);
    float pos = 0 + border;
    for (int i = 0; i < numColumns; i++){
     //strokeWeight(random(3,80));
     //fill(color(random(0, 200),random(150, 200),random(0, 200)));
     stroke(10);
     updateColor( 10);

     rect(pos, y, sizeW, h);
     //noStroke();
     ellipse( pos+(sizeW/2), y+(h/2), sizeW/numColumns, sizeW/numColumns);
     pos = pos + sizeW;
    }
  }
  
void drawGrid(int numColumns, int numRows, float border) {
    float sizeH = (float(height) - border*2) / float(numRows);
    float pos = 0 + border;
    for (int i = 0; i < numRows; i++) {
     drawRow(numColumns, pos, sizeH, border);  
     pos = pos + sizeH;
    }
    
}

void updateColor( int frames) {
    count += 1;
    println(count);
    if ((count % frames) == 0){
      fill(color(random(0, 200),random(150, 200),random(0, 200)));
    }
    else {
    }
}
