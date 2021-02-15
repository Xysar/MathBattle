function HUD(leftside, health) {
  
  this.leftside = leftside; // true if base is on left of screen, false if on right
  this.healthbar = new HBar(this.leftside, health); // transfers data to health bar
  this.generator = new ProblemGenerator();
  this.generator.newProblem(1);
  
  this.render = function() {
    this.healthbar.render();
  };
  
  this.getHealth = function() {
    return this.healthbar.getVal();
  };

  this.setHealth = function(num) {
    this.healthbar.setVal(num);
  };
  
}
