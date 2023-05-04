int count = 0;
int numSquares = 1;
float[][] angleArray = new float[numSquares][12];
float size = 300;
float step = 6;
int frames = 10;
PImage img;
int max = 500;
color[][] colorArray = new color[max][max];

boolean userHasClicked = false;

void setup(){
  size(1200,600);
  //noLoop();
  frameRate(50);
  fillArray(size, step);
  
  img = loadImage("carpet.jpg");
  if(width>=height){
    img.resize(0, height);
  }
  else img.resize(width, 0);
  
  //printArray();
}

void draw(){
  
  background(#111111);
  stroke(220, 0, 0);
  strokeWeight(5);
  rectMode(CENTER);
  noFill();
  
  if (userHasClicked == true) { 
  float columns = int(map(mouseX, 0, width, 6, 100));
  float rows = int(map(mouseY, 0, height, 6, 100));
  drawGrid(columns, rows, count);
  //drawMorph(2);
  //drawMorph( numSquares, size);
  float size2 = size-220;
  int x = width / 5;
  for(int i = 0; i < 4; i++){
      int y = height / 4; 
      for(int j = 0; j < 3; j++){
        ellipse(mouseX, mouseY, 10, 10);
        push();
          translate(x, y);
          drawMorph(0, 0, numSquares, size2);
          if( (x-(size2/2)) < mouseX && mouseX < (x+(size2/2))){
            rect(0, 0, 10, 10);
          }
          if( (y-(size2/2)) < mouseY && mouseY < (y+(size2/2))){
            rect(0, 0, 10, 10);
          }
          if( ((y-(size2/2)) < mouseY && mouseY < (y+(size2/2))) && ((x-(size2/2)) < mouseX && mouseX < (x+(size2/2)))){
            rect(0, 0, 100, 100);
          }
          if ((count % frames) == 0){
            arrayCheck( size, step);
    }
          
          y += height / 4;
          pop();
      }
      x += width / 5;
    }
      
  count++;

  //printArray();
  //println(" ");
  //println(" ");

  //fill(#f1f1f1);
  //strokeWeight(10);
  //noFill();
  //fill(color(random(0, 200),random(150, 200),random(0, 200)));
  //strokeWeight(random(3,80));
  //stroke(10);
  //updateColor(100, 40);
  };
}

void mousePressed() { userHasClicked = !userHasClicked; }

void drawShape( int shapeId, float posX, float posY, float size) {
    rect(posX, posY, size, size, angleArray[shapeId][0], angleArray[shapeId][1], angleArray[shapeId][2], angleArray[shapeId][3]);
}

void drawMorph(float posX, float posY, int numShapes, float size) {
    float rotation = radians(90 / numShapes);
    for(int i = 0; i < numShapes; i++){
      //push();
        drawShape(i, posX, posY, size);
        rotate(rotation);
      //pop();
    }
}
/*
void updateArray( int frames, int size) {
    count += 1;
    if ((count % frames) == 0){
      arrayCheck(size);
    }
    else {
    }
}
*/
void arrayCheck(float size, float step) {
    for(int i = 0; i < numSquares; i++){
      for(int j = 0; j < 4; j++){
        if (angleArray[i][j+8] >= 0){
          if (angleArray[i][j] >= angleArray[i][j+4]){
            angleArray[i][j+4] = random(0,5);
            angleArray[i][j+8] = (angleArray[i][j+4] - angleArray[i][j]) / step;
          }
        else angleArray[i][j] += angleArray[i][j+8];
        }
        else if(angleArray[i][j+8] <= 0){
          if (angleArray[i][j] <= angleArray[i][j+4]){
            angleArray[i][j+4] = random(0,size);
            angleArray[i][j+8] = (angleArray[i][j+4] - angleArray[i][j]) / step;
          }
        else angleArray[i][j] += angleArray[i][j+8];
        }}}}


void fillArray(float size, float step) {
    for(int i = 0; i < numSquares; i++){
      for(int j = 0; j < 4; j++){
        angleArray[i][j] = 0;
        angleArray[i][j+4] = random(0,size);
        angleArray[i][j+8] = (angleArray[i][j+4] - angleArray[i][j]) / step;
      }}}


void printArray(){
   for(int i = 0; i < numSquares; i++){
      for(int j = 0; j < 12; j++){
        println(i + " " + ((j%4)+1) + ": " + angleArray[i][j]);
      }
      println(" ");
    }}
    
    
    
    




  void drawGrid(float columns, float rows, int count) {
  rectMode(CORNER);
  float sizeH = ((height-2.5) / rows);
  float sizeW = ((width-2.5) / columns);
    
    for (int i = 0; i < rows; i++) {
       float posY = i * sizeH;
       for (int j = 0; j < columns; j++){
         float posX = j * sizeW;
         color c;  
         c = img.get(int(posX), int(posY));
         if(brightness(c) == count % 100) {
         fill(c);
         }
         //stroke(255);
         //println(posX + ", " + posY, ", " + sizeW + ", " + sizeH);
         rect(posX, posY, sizeW, sizeH);
         
        }}
      rectMode(CENTER);
    }


void fillArray(int size) {
  color c = color(random(200, 250),random(150, 200),random(0, 250));
  int counter = 0;
    for(int i = 0; i < size; i++){
      for(int j = 0; j < size; j++){
        colorArray[i][j] = c;
        counter++;
        if ((counter % 10) == 0){
          c = color(random(0, 250),random(150, 200),random(200, 250));
      }
      else{
      }
    }
}
}
