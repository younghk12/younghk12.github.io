int[] smartArray = new int[]{5, 12, 33, 20, 24};
int[] optimismArray = new int[]{62, 50, 33, 24, 17};
int len = 50;
int[][] intArray = new color[len][len];
boolean[][] boolArray = new boolean[len][len];
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

boolean checkMouse(int xLower, int xUpper, int yLower, int yUpper){
  if( ( (yLower) < mouseY && mouseY < (yUpper) ) && ( (xLower) < mouseX && mouseX < (xUpper) ) ){
    return true;
  }
  else return false;
}


void fillArrays(int detail) {
    int counter = 0;
    int previous = 0;
    int total = 0;
    for(int i = 0; i < detail; i++){
      for(int j = 0; j < detail; j++){
        //println("-----" + counter);
        int smartNum = checkSmart(counter, detail);
        //println(previous);
        
        if(smartNum != previous){
          total += smartArray[previous];
          //println("SUCCESS" + total);
        }
        
        float a;
        //println((float(counter) / (detail*detail)) *100);
          a = ((float(counter) / (detail*detail)) *100) - total;
        
        //println("a" + a);
        float b = float(smartArray[smartNum]) * (float(optimismArray[smartNum]) / 100);
        //println("b" + b);
        boolean optimism = (a < b);
        //println(optimism);
        intArray[i][j] = smartNum;
        boolArray[i][j] = optimism;
        
        previous = smartNum;
        counter++;
    }
}
}


boolean inGroup(int counter, int hover) {
        int smartNum = checkSmart(counter, len);
        if (smartNum == hover){
          return true;
        }
        else return false;
    }



int checkSmart(int counter, int detail){
  int total = 0;
  int next = 5;
  for(int i=0; i < 5; i++){
    if(i == 4){
      return 4; 
    }
    if( (counter) >= (int((float(total)/100) * (detail*detail))) && (counter) < (int((float(next)/100) * (detail*detail))) ){
      return i;
    }
    total+= smartArray[i]; 
    next = total + smartArray[i+1];
}
return 6;
}



color numToColor(int smartNum, boolean optimist){
  int opacity; 
  //println("smartnum: " + smartNum);
  if(optimist == true) {
     //println("true");
     opacity = 255;}
   else opacity = 127;
   if(smartNum == 0) return color(0, 150, 100, opacity);
   else if(smartNum == 1) return color(50, 255, 0, opacity);
   else if(smartNum == 2) return color(255, 255, 0, opacity);
   else if(smartNum == 3) return color(255, 150, 0, opacity);
   else if(smartNum == 4) return color(255, 0, 0, opacity);


   return color(0, 0, 0);
}

//(detail*detail)*(total/100)

void drawGrit(int x, int y, float areaX, float areaY, int detail, float cSize){
  
  rect(width/2,height/2, areaX+ 30, areaY+ 30);
  stroke(0);
  strokeWeight(1);
  
  int sizeH = int((areaX / detail));
  int sizeW = int((areaY / detail));
  int padding = int(cSize / 2);
  int counter = 0;
  boolean finalCheck = false;
  for (int i = 0; i < detail; i++){ 
    int posY = i * sizeH + (sizeH / 2);
    for (int j = 0; j < detail; j++){ 
      int posX = j * sizeW + (sizeH / 2);
      int smartNum = intArray[i][j];
      boolean optimist = boolArray[i][j];
      color fill = numToColor(smartNum, optimist);
      if( checkMouse(x + posX - padding, x + posX + padding, y + posY - padding, y + posY + padding) == true ){
        hover = true;
        show = smartNum;
        finalCheck = true;

        }
      else
      
      if (show == 6){
        fill(fill);
        rect(x + posX, y + posY, cSize, cSize);
      }
      if (smartNum == show){
         fill(fill);
         rect(x + posX, y + posY, cSize, cSize);
      }
      
      
  

      counter++;
      }}
      if (finalCheck == false){
        hover = false;
        show = 6;
      }
    }
  
  
  /**
  boolean show = inGroup(counter, smartNum);
        if(show){
          fill(fill);
          rect(x + posX, y + posY, cSize, cSize);
        }
        **/