function Base(name, leftside, myHUD, img) {

  this.name = name;
  this.leftside = leftside; // true if base is on left of screen, false if on right
  this.myHUD = myHUD;
  this.health = this.myHUD.getHealth();
  this.gold = new Gold();
  this.img = img;

  this.XDIV = 7;
  this.YDIV = 5;
  this.units = [];
  this.curUnits = 0;
  this.enemyBase = null;
  this.enemyDied = "";

  this.setEnemyBase = function(base) {
    this.enemyBase = base;
  };

  this.renderUnits = function() {
    for (let unit of this.units) {
      unit.render();
    }
  };

  this.addUnit = function(unit) {
    this.units.push(unit);
    unit.id = this.curUnits;
    this.curUnits++;
  };

  this.removeUnit = function(unit) {

    this.units.splice(unit.id, 1);
    this.curUnits--;

    for (const unit2 of this.units) { // shifts id's down one to reflect one less unit 
      if (unit2.id > unit.id) {
        unit2.id--;
      }
    }
  };

  this.moveUnits = function() {
    this.enemyDied = "";
    
    for (const unit of this.units) {

      if (unit.health <= 0) {
        this.removeUnit(unit);
        this.enemyBase.gold.incrGold(dropGold(this.name));
        this.enemyDied = unit.name;
          
      }

      unit.checkSurroundings(unit.range);

      if (unit.waiting) {
      } else if (unit.fighting) {
        unit.fight();
        if(!unit.base.leftside){
        }
      } else {
        unit.move();
        if(!unit.flying){
        unit.curFightFrame = 0;
        }
      }

      if (unit.progress >= 1740 || unit.progress <= 260) {
        this.removeUnit(unit);
        this.enemyBase.health -= unit.damage;
        this.enemyBase.updateHUD();
      }
    }
  };

  this.updateHUD = function() {
    this.myHUD.setHealth(this.health);
  };
  
}

Base.prototype.render = function() {

  // bases will always be proportional to eachother + mirroring eachother


  let size = width/8;

  let basex = width/this.XDIV; // x of left base
  this.basey = (this.YDIV-1)*height/this.YDIV; // y of base (left or right)


  let basediv = this.XDIV-1; 
  let basexr = basediv*basex;

  let flagx = basex-0.5*size;
  let flagy = this.basey-size*2; // (flagx, flagy) = top of left flagpole
  let flagxr = basediv*basex+0.5*size; // (flagxr, flagy) = top of right flagpole


  
  if(this.leftside){
  image(this.img, basex-size, this.basey-size-width/12, width/4, width/4);
  }
  else{
    image(this.img, basexr-size+width/500, this.basey-size-width/12, width/4, width/4);
  }


  //if (this.leftside) {
  //  fill(255);
  //  square(basex-size, this.basey-size, size);
  //  line(flagx, this.basey-size, flagx, this.basey-size*2);
  //  fill(0, 0, 255);
  //  triangle(flagx, flagy, basex+0.25*size, flagy+0.5*size, flagx, flagy+0.5*size);

  //  fill(255);
  //  rect(basex-0.25*size, this.basey-0.25*size, (1/8)*size, 0.25*size);
  //  circle(basex-5*(1/32)*size, this.basey-(1/8)*size, size/80);

  //  fill(0);
  //  textAlign(CENTER, CENTER);
  //  textSize(16);
  //  text(this.name+"'s Base", basex-0.5*size, this.basey-0.5*size);
  //} else {
  //  fill(255);
  //  square(basexr, this.basey-size, size);
  //  line(flagxr, this.basey-size, flagxr, this.basey-size*2);
  //  fill(255, 0, 0);
  //  triangle(flagxr, flagy, basexr-0.25*size, flagy+0.5*size, flagxr, flagy+0.5*size);
  //  fill(255, 255, 255);
  //  rect(basexr+(1/8)*size, this.basey-0.25*size, (1/8)*size, 0.25*size);
  //  circle(basexr+5*(1/32)*size, this.basey-(1/8)*size, size/80);

  //  fill(0);
  //  textAlign(CENTER, CENTER);
  //  textSize(16);
  //  text(this.name+"'s Base", basexr+0.5*size, this.basey-0.5*size);
  //}
};

function dropGold(unitrank){
  switch(unitrank){
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 1;
    case "4":
      return 2;
    case "5":
      return 2;
    case "6":
      return 2;
    case "7":
      return 3;
  }
}
      
  
