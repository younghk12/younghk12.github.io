int[] smartArray = new int[]{5, 12, 33, 20, 24};
int[] optimismArray = new int[]{62, 50, 33, 24, 17};
int len = 50;
Square[][] squareArray = new Square[len][len];
boolean hover = false;
int show = 6;


void setup(){
  size(1000,1000);
  //noLoop();
  frameRate(100);
}


void draw(){
  background(#121212);
  stroke(230);
  strokeWeight(3);
  noFill();
  
  
  ellipseMode(CENTER);
  
  
  shapeMode(CORNER);
  rectMode(CENTER);
  //fill(200);
  //analogEffect(500, 500, 9);
  fillArrays(len);
  int size = 800;
  len = int(map(mouseX, 0, width, 5, 50)); 
  drawGrit(100, 100, size, size, len, float(size/len) + 2); }


boolean checkHover(int detail) {
    int counter = 0;
    for(int i = 0; i < detail; i++){
      for(int j = 0; j < detail; j++){
        
        
        
        counter++;
    }
}
  
  return true;
}

boolean checkMouse(float xLower, float xUpper, float yLower, float yUpper){
  if( ( (yLower) < mouseY && mouseY < (yUpper) ) && ( (xLower) < mouseX && mouseX < (xUpper) ) ){
    return true;
  }
  else return false;
}






//(detail*detail)*(total/100)

void fillArrays(int detail) {
    int counter = 0;
    int previous = 0;
    int total = 0;
    for(int i = 0; i < detail; i++){
      for(int j = 0; j < detail; j++){
        //println("-----" + counter);
        Square square = new Square();
        int smartScore = square.checkSmart(counter, detail);
        
        if(smartScore != previous){
          total += smartArray[previous];
          //println("SUCCESS" + total);
        }
        
        square.setSquare(counter, detail, total);
        squareArray[i][j] = square; 
        
        previous = smartScore;
        counter++;
    }
}
}



void drawGrit(float x, float y, float areaX, float areaY, int detail, float cSize){
  
  rect(width/2,height/2, areaX+ 30, areaY+ 30);
  stroke(0);
  strokeWeight(1);
  
  float sizeH = (areaX / detail);
  float sizeW = (areaY / detail);
  int padding = int(cSize / 2);
  int counter = 0;
  boolean finalCheck = false;
  for (int i = 0; i < detail; i++){ 
    float posY = i * sizeH + (sizeH / 2);
    for (int j = 0; j < detail; j++){ 
      float posX = j * sizeW + (sizeH / 2);
      
      Square square = squareArray[i][j];
      color fillColor = square.getColor();
      
      if( checkMouse(x + posX - padding, x + posX + padding, y + posY - padding, y + posY + padding) == true ){
        hover = true;
        show = square.getSmartScore();
        finalCheck = true;

        }
      else
      
      if (show == 6){
        fill(fillColor);
        rect(x + posX, y + posY, cSize, cSize);
      }
      if (square.getSmartScore() == show){
         fill(fillColor);
         rect(x + posX, y + posY, cSize, cSize);
      }
      
      counter++;
      }}
      if (finalCheck == false){
        hover = false;
        show = 6;
      }
    }
  
 
