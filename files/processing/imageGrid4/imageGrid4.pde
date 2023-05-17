PImage img;

void setup(){
  size(700,900);
  img = loadImage("image2.jpg");
  img.resize(width, 0);
}

void draw(){
  background(0);
  imageMode(CORNER);
  noStroke();

  
  //image(img, 0, 0);
  color c;  
  
  float columns = map(mouseY, 0, width, 2, 100);
  float rows = map(mouseX, 0, height, 2, 100);
  
  float sizeH = height / rows;
  float sizeW = width / columns;
    
  
    for (int i = 0; i < rows; i++) {
       float posY = i * sizeH;
       for (int j = 0; j < columns; j++){
         float posX = j * sizeW;
         c = img.get(int(posX), int(posY));
         fill(c);
         //stroke(255);
         rect(posX, posY, sizeW, sizeH);
        } 
     }
}
