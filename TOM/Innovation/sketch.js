function preload(){
  //laserpointer
  imageURL = "laser.png"
  img = loadImage(imageURL);
}

function setup() {
  //canvas
  canvasX = windowWidth;
  canvasY = windowHeight-100;
  createCanvas(canvasX, canvasY);
  
  //sliders
  slider_lambda = createSlider (380,760,500);
  slider_lambda.size(canvasX-10);
  
  slider_p = createSlider(170,canvasX-30,500);
  slider_p.size(canvasX-10);
  
  slider_d = createSlider (380,10000,5000);
  slider_d.size(canvasX-10);  
  
  slider_n = createSlider (1,20,5);
  slider_n.size(canvasX-10);
}

function draw() {
  //independant variables
  var p = slider_p.value();
  var lambda = slider_lambda.value();
  var d = slider_d.value();
  var n = slider_n.value();
  
  //dependant variables
  var l_cm = canvasX - 10 - p;
  var l_nm = l_cm*1e6
  var x_n = new Float32Array(n);
  for (let x = 0; x < n; x++) {
    theta=asin((x+1)*lambda/d);
    x_n[x] = tan(theta)*l_nm*2/1e6
  var degree = asin(n*lambda/d)*180/PI  
  }
  
  //colormode
  colorMode(HSL)
  var hue = 0
  hue=-1.178*lambda+760
  
  //background color
  background(0,0,0);
  
  //wall
  stroke(0,0,50);
  fill(0,0,50);
  rect(canvasX-10,0,20,canvasY)
  
  //laser
  stroke(hue,100,50)
  strokeWeight(2);
  line(140,canvasY/2,p,canvasY/2);
  line(p+1,canvasY/2,canvasX-10,canvasY/2);
  
  stroke(hue,100,50)
  strokeWeight(5)
  point(canvasX-10,canvasY/2);
  
  stroke(hue,100,90)
  strokeWeight(3)
  point(canvasX-10,canvasY/2);
  
  //deflections
  for (let x=0; x < n; x++) {
    //lines color
    stroke(hue,100,50)
    strokeWeight(2);
    line(p+1,canvasY/2,canvasX-10,canvasY/2-x_n[x]/2);
    line(p+1,canvasY/2,canvasX-10,canvasY/2+x_n[x]/2);
    
    //dots color
    stroke(hue,100,50)
    strokeWeight(5);
    point(canvasX-10,canvasY/2-x_n[x]/2);
    point(canvasX-10,canvasY/2+x_n[x]/2);
    
    //dots white
    stroke(hue,100,90)
    strokeWeight(3);
    point(canvasX-10,canvasY/2-x_n[x]/2);
    point(canvasX-10,canvasY/2+x_n[x]/2);
  }
  
  //stroke size
  strokeWeight(2);
  
  //grid
  stroke(0,0,100);
  line(p,canvasY/2-30,p,canvasY/2+30);
  
  //box for values 
  fill(0,0,0)
  stroke(0,0,100)
  rect(20,20,380,65);
  
  //text for values
  if (isNaN(degree)) {
  noStroke() 
  fill(0,0,100)   
  textSize(19)    
  text("Maximale orden er overskredet!!!",37, 60 ) 
 }
  
 else {
  noStroke() 
  fill(0,0,100) 
  textSize(12) 
  text("Afbøjningsvinkel (theta_n): " +
       round(asin(n*lambda/d)*180/PI,3)+"˚",35, 45 )
  text("Afbøjningsafstand (x_n): " +
       round(x_n[n-1],2)+"cm",35, 65 )
 }  
  
  //box for text for sliders
  fill(0,0,0);
  strokeWeight(2);
  stroke(0,0,100);
  rect(20,canvasY-120,200,100);
  
  //text for sliders
  noStroke();
  fill(0,0,100);
  textSize(12);
  text("Bølgelængde (lambda): "+lambda+" nm",35, canvasY-95);
  text("Afstand fra væg (l): "+l_cm+" cm",35,canvasY-75);
  text("Gitterkonstant (d): "+d+" nm",35,canvasY-55)
  text("Maksimale orden (n): "+n,35,canvasY-35)
  
  //laserpointer position
  image(img,-250,canvasY/2-30);
}