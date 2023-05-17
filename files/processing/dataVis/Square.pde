public class Square{
  
  private int smartScore;
  private boolean outlook;
  private color fillColor;
  
  public Square(){
    this.smartScore = 0;
    this.outlook = false;
    this.fillColor = color(0, 0, 0);
  }
  
  
  public void setSquare(int counter, int detail, int total){
    this.smartScore = checkSmart(counter, detail); 
    this.outlook = checkOutlook(counter, detail, total, this.smartScore);
    this.fillColor = numToColor(this.smartScore, this.outlook);
  }
  
  
  public int checkSmart(int counter, int detail){
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
  
  
  public boolean checkOutlook(int counter, int detail, int total, int smartNum){
    float a = ((float(counter) / (detail*detail)) *100) - total;
    float b = float(smartArray[smartNum]) * (float(optimismArray[smartNum]) / 100);
    return (a < b);
    
  }

  public color numToColor(int smartNum, boolean optimist){
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
  
  public color getColor(){
    return this.fillColor; 
  }
  
  public int getSmartScore(){
    return this.smartScore; 
  }
  

  
  
}
