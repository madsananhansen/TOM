function setup() {
  //canvas
  canvasX = windowWidth
  canvasY = windowHeight-130
  createCanvas(canvasX, canvasY)
  
  //sliders
  slider_α = createSlider(0,90000,45000)
  slider_α.size(canvasX)
  
  slider_v_0 = createSlider (0,50000,5000)
  slider_v_0.size(canvasX)
  
  slider_y_0 = createSlider (0,3000,0)
  slider_y_0.size(canvasX)
  
  slider_t = createSlider (0,10000,0)
  slider_t.size(canvasX)
  
  slider_c = createSlider (30,10000,1000)
  slider_c.size(canvasX)
}

function draw() {
  //independant variables
  var α = slider_α.value()/1000
  var v_0 = slider_v_0.value()/1000
  var y_0 = slider_y_0.value()/1000
  var t = slider_t.value()/1000
  var g = 9.82
  var x_0 = 50
  var c = slider_c.value()/10
  
  //dependant variables
  var α_r = α*PI/180
  var v_0x = v_0*cos(α_r)
  var v_0y = v_0*sin(α_r)
  var v_x = v_0x
  var v_y = -g*t+v_0y
  var v = sqrt(v_x**2+v_y**2)
  var α_t = acos(v_x/v)
  var x_t = v_0x*t
  var y_t = 0.5*-g*t**2+v_0y*t+y_0
  var x_max = (tan(α_r)*v_0x**2+(sqrt((tan(α_r))**2+2*g*y_0/v_0x**2))*v_0x**2)/g
  var y_max = tan(α_r)**2*v_0x**2/(2*g)+y_0
  var t_top = v_0y/g
  var x_top = v_0x*t_top
  
  //colormode
  colorMode(HSL)
  
  //background color
  background(0,0,100)
  
  //x-axis
  stroke(0,0,0)
  fill(0,0,0)
  strokeWeight(2)
  line(0,canvasY-50,canvasX-10,canvasY-50)
  triangle(canvasX-10,canvasY-50,canvasX-20,canvasY-55,canvasX-20,canvasY-45)
  var l = canvasX
  var x_l = new Float32Array(l)
  for (let i = 0; i < l; i++) {x_l[i] = canvasX*i/float(l)}
  for (let i = 0; i < l; i++) {line(x_l[i]*c+x_0,canvasY-50,x_l[i]*c+x_0,canvasY-40)}
  noStroke()
  textSize(12)
  text("x (m)",canvasX-50,canvasY-55)
  
  //y-axis
  stroke(0,0,0)
  fill(0,0,0)
  strokeWeight(2)
  line(x_0,canvasY,x_0,10)
  triangle(50,10,45,20,55,20)
  var m = canvasY
  var y_m = new Float32Array(m)
  for (let j = 0; j < m; j++) {y_m[j] = canvasY*j/float(m)}
  for (let j = 0; j < m; j++) {line(50,canvasY-50-y_m[j]*c,40,canvasY-50-y_m[j]*c)}
  noStroke()
  textSize(12)
  text("y (m)",55,30)
  
  //parabular
  stroke(0,0,0)
  strokeWeight(2)
  var n = x_max*250
  var x = new Float32Array(n)
  var y_x = new Float32Array(n)
  for (let k = 0; k < n; k++) {
    x[k] = x_max*k/float(n)
    y_x[k] = (-g*(x[k]**2))/(2*(v_0x**2))+tan(α_r)*x[k]
  }
  for (let k = 0; k < n; k++) {point(x_0+x[k]*c,canvasY-50-y_0*c-y_x[k]*c)}
  
  //projectile direction
  stroke(0,100,50)
  fill(0,100,50)
  strokeWeight(2)
  if (x_t<x_max){
  var o_x = x_0+x_t*c
  var o_y = canvasY-50-y_t*c
  stroke(120,100,50)
  fill(120,100,50)
  line(o_x,o_y,o_x+v_0x*c/5,o_y)
  triangle(o_x+v_0x*c/5,o_y,o_x+v_0x*c/5-10,o_y+5,o_x+v_0x*c/5-10,o_y-5)
  
  stroke(240,100,50)
  fill(240,100,50)
  line(o_x,o_y,o_x,o_y-v_y*c/5)
  if(v_y>0.5) {triangle(o_x,o_y-v_y*c/5,o_x+5,o_y-v_y*c/5+10,o_x-5,o_y-v_y*c/5+10)}
  else if (v_y<-0.5) {triangle(o_x,o_y-v_y*c/5,o_x+5,o_y-v_y*c/5-10,o_x-5,o_y-v_y*c/5-10)}
  else {triangle(0,0,0,0,0,0)}
  
  stroke(0,100,50)
  fill(0,100,50)
  line(o_x,o_y,o_x+v_0x*c/5,o_y-v_y*c/5)
  if (x_t<x_top){
  triangle(o_x+v_0x*c/5,o_y-v_y*c/5,o_x+v_0x*c/5+5*sin(α_t)-10*cos(α_t),o_y-v_y*c/5+5*cos(α_t)+10*sin(α_t),o_x+v_0x*c/5-5*sin(α_t)-10*cos(α_t),o_y-v_y*c/5-5*cos(α_t)+10*sin(α_t))}
  else {
    triangle(o_x+v_0x*c/5,o_y-v_y*c/5,o_x+v_0x*c/5+5*sin(-α_t)-10*cos(-α_t),o_y-v_y*c/5+5*cos(-α_t)+10*sin(-α_t),o_x+v_0x*c/5-5*sin(-α_t)-10*cos(-α_t),o_y-v_y*c/5-5*cos(-α_t)+10*sin(-α_t))}
  }
  
  //ball
  stroke(0,0,0)
  fill(60,100,50)
  strokeWeight(2)
  if (x_t<x_max) {ellipse(x_0+x_t*c,canvasY-50-y_t*c,15,15)}
  else {ellipse(x_0+x_max*c,canvasY-50,15,15)}
  
  //text for sliders and values
  noStroke() 
  fill(0,0,0) 
  textSize(12) 
  text("Vinkel (α): " + α + "˚",100, 35)
  text("Maks længde (x_max): " + round(x_max,3) + "m",100,55)
  text("Maks højde (y_max): " + round(y_max,3) + "m",100,75)
  text("Fart (v_0): " + v_0 + "m/s",300, 35)
  text("Vandret fart (v_0x): " + round(v_0x,3) + "m/s",300, 55)
  text("Lodret fart (v_0y): " + round(v_0y,3) + "m/s",300, 75)
  text("Højde (y_0): " + y_0 + "m",500,35)
  text("Stighøjde (y_max-y_0): " + round(y_max-y_0,3) + "m",500,55)
  text("Længde til maks højde (x_1): " + round(x_top,3) + "m",500,75)
  text("Tid (t): " + t + "s",750, 35)
  if (x_t<x_max) {
    text("Længde (x(t)): " + round(x_t,3) + "m",750,55)
    text("Højde (y(t)): " + round(y_t,3) + "m",750,75)}
  else {
    text("Længde (x(t)): " + round(x_max,3) + "m",750,55)
    text("Højde (y(t)): " + round(y_max,3) + "m",750,75)}
}
