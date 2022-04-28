let vs = []
function setup() {
  createCanvas(500, 500);
  p = new Vehicle(200,200);
}

function draw() {
  background("pink");
  
  p.display()
  p.edges()
  p.update();
  p.wander();
  
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 60.0;
    this.maxspeed = 3;
    this.maxforce = 0.1;
    this.wanderTheta = 0;
  }
  
  wander(){
    //let steeringforce = p5.Vector.random2D()
    //steeringforce.setMag(0.1)
    //this.applyForce(steeringforce)
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location)

    let wanderRadius = 50;
    let theta = this.wanderTheta  + this.velocity.heading();

    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));

    let debug = true 
    if (debug){
      push()  
      line( this.location.x, this.location.y, projPoint.x, projPoint.y);
      noStroke()
      fill("yellow")
      circle (projPoint.x, projPoint.y, 20)
      fill("orange")
      circle (projPoint.x, projPoint.y, 30)
      noFill()
      stroke ("blue")
      circle(projPoint.x, projPoint.y, wanderRadius*0.7)
      
      
      
      pop()
    }
    
    let steeringforce = wanderPoint.sub(this.location);
    steeringforce.setMag(this.maxforce)
    this.applyForce(steeringforce)
    
    this.wanderTheta += random(-0.6, 0.6);
   
    
    
    }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(135, 206, 235);
    stroke(3);
    translate(this.location.x, this.location.y)
    rotate(theta)

    fill(224, 255, 255)
    ellipse(90, 90, 130, 170)
    fill(230, 230, 250)
    ellipse(90,120,100,100)
    ellipse(70,40,30,40)
    ellipse(110,40,30,40)
    fill("black")
    ellipse(70,40,10,10)
    ellipse(110,40,10,10)
    fill("yellow")
    ellipse(55, 180, 60, 30)
    ellipse(125, 180, 60, 30)
    arc(80, 62, 40, 40, radians(0), radians(90))
    
    fill("white")
    triangle(0, this.l/2, 0, -this.l/2, this.l,0)
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}
