int count = 0;
color[][] colorArray = new color[41][41];


void setup(){
  size(600,600);
  //noLoop();
  frameRate(100);
  int num = 40;
  fillArray(num);

}

void draw(){
  background(#111111);
  stroke(0);
  //strokeWeight(10);
  //noFill();
  fill(#f1f1f1);
  ellipseMode(CENTER);
  //fill(color(random(0, 200),random(150, 200),random(0, 200)));
  //strokeWeight(random(3,80));
  //stroke(10);
  updateColor(50, 40);

  
  shapeMode(CORNER);
  int num = int(map(mouseX, 0, width-20, 2, 40));
  drawGrid(num, num, 50); 
  
}


  
void drawGrid(int numColumns, int numRows, float border) {
    float sizeH = (float(height) - border*2) / float(numRows);
    float sizeW = (float(width) - border*2) / float(numColumns);
    
    float posY = 0 + border;
    for (int i = 0; i < numRows; i++) {
       float posX= 0 + border;
       for (int j = 0; j < numColumns; j++){
       //updateColor(100, numColumns);
       fill(colorArray[i][j]);
       //fill(color(random(0, 200),random(150, 200),random(0, 200)));

       rect(posX, posY, sizeW, sizeH);
       //noStroke();
       ellipse( posX+(sizeW/2), posY+(sizeH/2), sizeW/numColumns, sizeW/numColumns);
       posX = posX + sizeW;
      } 
    posY = posY + sizeH;
    }
}


void updateColor( int frames, int size) {
    count += 1;
    if ((count % frames) == 0){
      fillArray(size);
    }
    else {
    }
}

void fillArray(int size) {
    for(int i = 0; i < size; i++){
      for(int j = 0; j < size; j++){
        colorArray[i][j] = color(random(0, 200),random(150, 200),random(0, 200));
      }
    }
}
