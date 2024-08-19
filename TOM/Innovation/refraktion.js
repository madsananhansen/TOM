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

  
  slider_p = createSlider(170,canvasX/2);
  slider_p.size(canvasX-10);

  slider_y = createSlider(100,canvasY-100,(canvasY)/2)
  slider_y.size(canvasX-10);

  slider_n_1 = createSlider(100,200)
  slider_n_1.size(canvasX-10);
  
  slider_n_2 = createSlider(100,200)
  slider_n_2.size(canvasX-10);

}

function draw() {
  //independant variables

  color(255,255,255)
  rect(30,30,30,30)

  angleMode(DEGREES);

  
  var p = slider_p.value();
  var lambda = 760;
  //var lambda = slider_lambda.value();
  var y = slider_y.value();
  var n_1 = slider_n_1.value()/100;
  var n_2 = slider_n_2.value()/100;
  
  // længde af medie 2
  var a = canvasX/5;

  //afstand fra medie
  var c = p;
  
  //colormode
  colorMode(HSL)
  var hue = 0
  hue=-1.178*lambda+760
  
  //background color
  background(0,0,0);

  //medie
  noStroke();
  fill(0,0,50);
  rect(p,0,canvasX/5,canvasY);

  let v1 = createVector(p-164, y-(canvasY/2));
  let v2 = createVector(canvasX, 0);

  let angle = round(v1.angleBetween(v2), 2);

  var i = angle;
  var b = round((asin((sin(i)*n_1)/n_2)),2);
  var r = c*tan(i);
  var z = a*tan(b);
  var p_1 = 164
  var y_1 = canvasY/2;
  var p_2 = p+a;
  var y_2 = y-z;
  var p_3 = canvasX-10;
  var y_3 = ((y_1-y)/(p_1-p))*(p_3-p_2)+y_2;
  var p_4 = p-c;
  var y_4 = (y-r);


  console.log("Indfaldsvinkel: " + i);
  console.log("Brydningsvinkel:" + b);

  //wall right
  noStroke();
  fill(0,0,50);
  rect(canvasX-20,0,20,canvasY);

  //wall left
  rect(0,0,20,canvasY);


  //indfaldslod
  push();
  
  stroke(255);
  setLineDash([5, 5]);

  if(isNaN(b)){
    line(20,y,p,y)
  }

  else{
    line(20,y,p_2,y)
    line(p,y_2,p_3,y_2)
  }

  pop();


  //laser
  stroke(hue,100,50)
  strokeWeight(2);
  
  //fra laser til middel
  line(p_1,y_1,p,y);
  
  //i middel
  line(p,y,p_2,y_2);

  //fra middel til væg
  line(p_2,y_2,p_3,y_3);

  //laser dot outer
  stroke(hue,100,50)
  strokeWeight(5);
  point(p_3,y_3);

  //laser dot inner
  stroke(hue,100,90)
  strokeWeight(3);
  point(p_3,y_3);

  //reset line values
  strokeWeight(2);
  stroke(hue,100,50)

  
  if (isNaN(b)){
    //laser
    line(p,y,p_4+10,y_4);
    
    //laser dot outer
    stroke(hue,100,50)
    strokeWeight(5);
    point(p_4+10,y_4);

    //laser dot inner
    stroke(hue,100,90)
    strokeWeight(3);
    point(p_4+10,y_4);

    //reset line values
    strokeWeight(2);
    stroke(hue,100,50)
  }
  

  //box for values 
  fill(0,0,0)
  stroke(0,0,100)
  rect(25,20,200,40);

  fill(0,0,100)
  noStroke()
  if (isNaN(b)){
    text("Udfaldsvinkel (u): "+i+"°",40,45)
  }
  else{
    text("Brydningsvinkel (b): "+b+"°",40,45)
  }
  
  //box for text for sliders
  fill(0,0,0);
  strokeWeight(2);
  stroke(0,0,100);
  rect(25,canvasY-95,200,75);
  
  //text for sliders
  noStroke();
  fill(0,0,100);
  textSize(12);
  text("Indfaldsvinkel (i): "+i+"°",40,canvasY-75);
  text("Brydningsindex af middel 1: "+n_1,40,canvasY-55)
  text("Brydningsindex af middel 2: "+n_2,40,canvasY-35)
  
  //laserpointer position
  image(img,-250,canvasY/2-30);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}