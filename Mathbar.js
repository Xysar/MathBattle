function Mathbar(base) {
  
  const MAXSCREENWIDTH = 1270;
  this.problemGen = new ProblemGenerator(base);
  this.question = this.problemGen.display();
  if(this.question === null) {
    console.log("Error");
  }
  this.queue = [];
  
  this.render = function() {
    this.question = this.problemGen.display();
    let xsize = width/3;
    let ysize = height/4;
    let barxsize = 5/6 * width/3;
    let barysize = height/30;
    
    noFill();
    rectMode(CENTER);
    //rect(width/2, ysize/2, xsize, ysize);
    fill(255);
    rect(width/2, 2 * ysize/3, barxsize, barysize);
    fill(0);
    if(lvlselect.curLevel == 4){
      fill(255);
    }
    if(lvlselect.curLevel == 3){
      fill(255);
    }
    rectMode(CORNER);
    textAlign(CENTER);
    textSize(32 * width/MAXSCREENWIDTH);
    text(this.question, width/2, ysize/9 + (40 * width/MAXSCREENWIDTH));
    textSize(16 * width/MAXSCREENWIDTH);
    fill(0);
    text(this.queue.join(""), width/2, 2 * ysize/3);
  };
  
  this.push = function(cha) {
    if(this.queue.length < 40) {
      this.queue.push(cha);
    }
  };
  
  this.pop = function() {
    return this.queue.pop();
  };
  
  this.clear = function() {
    this.queue = [];
  };
  
  this.isClear = function() {
    return this.queue.length === 0;
  };
  
  this.check = function() {
    // only do this if the answer is right
    if(this.problemGen.check(int(this.queue.join("")))) {
      this.clear();
      this.question = this.problemGen.display();
    }
  };
}
