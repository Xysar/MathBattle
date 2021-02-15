function Unit(base) { // unit needs to be given a base as an argument 

  this.name = "";
  this.base = base; // base that this unit belongs to
  this.health = 100;
  this.totalhealth = 100;
  this.id = 0; // unique id for each unit in a base. first unit has id 0, second 1, third 2, etc. 
  this.waiting = false;
  this.speed = 1;
  this.textsize = width/50; // to be replaced
  this.progress = this.base.leftside ? 262 : 1738; // arbitrary number counting to 2000 to determine the proper x coordinate for the unit 

  // animation/fighting related fields

  this.damage = 0;
  this.totalFightFrame = 50;
  this.curFightFrame = 0; 
  this.attackFrame = 20;
  this.fighting = false;
  this.range = width/15; // standard melee fighter range
  this.curTarget = null;
  this.projectile = new Projectile(0, 0, 0, 0);
  this.projectile.shape = "none";
  this.x = width*(this.progress/2000);
  this.y = this.base.basey;
  this.flying = false;
  this.image = null;
  this.imageleft = null;
  this.imageright = null;
  this.imagefight = null;
  this.isnotPi = true;

  this.move = function() {
    this.progress = this.base.leftside ? this.progress+this.speed/2 : this.progress-this.speed/2;
  };

  this.render = function() {


    switch(this.name) {
    case "1":
      this.speed = 1;
      this.range = width/15;
      break;
    case "2":
      this.range = width/15;
      break;
    case "3":
      this.range = width/8;
      break;
    case "4":
      this.range = width/15;
      this.weaponLength = width/12;
      break;
    case "5":
      this.range = width/15;
      break;
    case "6":
      this.range = width/10;
      this.splashRange = width/20;
      break;
    case "7":
      if (this.progress <= 261 || this.progress >= 1739) {
        this.progress = this.base.leftside ? 262 : 1738;
      }
      this.range = width/12;
      this.speed = 1.5;
      this.weaponLength = width/12;
      this.curFightFrame++;
      if (this.curFightFrame == 125) {
        this.fighting = !this.fighting;
        this.curFightFrame = 0;
      }


      break;
    case "pi":
      this.speed = 3;
      this.totalFightFrame = 2;
      this.attackFrame = 1;
      if(this.progress >= 1736){
        this.health = -1;
      }
      break;
    }




    this.textsize = width/50; // to be replaced
    this.x = width*(this.progress/2000);
    this.y = this.flying ? this.base.basey-height/8 : this.base.basey;


    fill(0);

    textSize(this.textsize);
    let textsize = this.textsize;

    // when implmenting images, these should use # of pixels
    // to correctly orient the unit, not textsize
      if (this.base.leftside) {

        if (this.imageleft != null && this.imageright != null) {
          this.chooseImage();
        } else {
          image(this.image, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2);
        }
        if (this.isnotPi) {
          fill(255);
          rect(this.x+textsize/2, this.y-textsize*2.5, textsize, textsize/3);
          fill(255, 0, 0);
          rect(this.x+textsize/2, this.y-textsize*2.5, textsize*(this.health/this.totalhealth), textsize/3);
        }
      } else {
        fill(255, 0, 0);

        if (this.imageleft != null && this.imageright != null) {
          this.chooseImage();
        } else {
          image(this.image, this.x-textsize, this.y-textsize*2, this.textsize*2, this.textsize*2);
        }
        if(this.isnotPi) {
          fill(255);
          rect(this.x-textsize/2, this.y-textsize*2.5, textsize, textsize/3);
          fill(255, 0, 0);
          rect(this.x-textsize/2, this.y-textsize*2.5, textsize*(this.health/this.totalhealth), textsize/3);
        }
      }
  };

  this.fight = function() { // left empty to reflect how all units fight differently
  };


  this.compareUnit = function(unit) { // returns num distance between two units
    if (this.base.leftside) { 
      return unit.x-this.x;
    } else if (!this.base.leftside) { 
      return this.x-unit.x;
    }
  };

  this.checkForEnemy = function(enemy, range) { // true if an enemy is within fighting distance
    let compare = this.compareUnit(enemy);

    if ((this.projectile.shape == "none" || this.projectile.shape == "circle") && enemy.flying) {
      return false;
    }


    if (compare < range && compare > 0 && this.base.leftside != enemy.base.leftside && this.unit !== enemy) { 
      return true;
    }
    return false;
  };

  this.checkForAlly = function(ally) { // true if ally ahead is fighting or waiting (moves past units w/ greater range)

    let compare = this.compareUnit(ally); 
    if (!this.flying) {
      if (compare > 0 && compare < width/75 && this.base.leftside == ally.base.leftside && this.unit !== ally && (ally.fighting || ally.waiting) && ally.range == this.range) {
        return true;
      }
    }
    return false;
  };

  this.checkSurroundings = function() { // compares this to all units in the game, changes state accordingly
    let allunits = this.base.units.concat(this.base.enemyBase.units);

    let waitvalue = false;
    let fightvalue = false;

    for (let unit in allunits) {
      if (this.checkForAlly(allunits[unit])) {
        waitvalue = true;
      } else if (this.checkForEnemy(allunits[unit], this.range) && !(allunits[unit].flying && !this.range == width/8)) {
        if (this.compareUnit(allunits[unit] <= this.range)) {
        }
        fightvalue = true;
      }


      if (this.base === allunits[unit].base && this.progress === allunits[unit].progress && this !== allunits[unit] && this.y === allunits[unit].y) { // prevents spawning on top of eachother
        this.progress += 0.5;
      }
    }

    if (this.flying) {
      fightvalue = this.fighting;
    }
    this.fighting = fightvalue;
    this.waiting = waitvalue;
  };

  this.getClosestEnemy = function() { // returns closest enemy unit to this

    let enemyUnits = this.base.enemyBase.units;
    let closestEnem = null;
    let curDistance = width;

    for (let enemy in enemyUnits) { // checks all enemies, updates closestEnem when a closer enemy is found 

      let distance = this.compareUnit(enemyUnits[enemy]);

      if (distance < curDistance && distance > -1*this.range && !(this.projectile.shape == "none" && enemyUnits[enemy].flying)) {
        curDistance = distance;
        closestEnem = enemyUnits[enemy];
      }
    }
    return closestEnem;
  };

  this.dealDamage = function() {
    this.getClosestEnemy().health -= this.damage;
  };

  this.chooseImage = function() {
    let textsize = this.textsize;

    if (this.base.leftside) {
      if (this.waiting) {
        image(this.image, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2);
      } else if (this.fighting || this.waiting) {
        image(this.image, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2);
      } else {
        switch(true) {
          case (this.progress%40 < 10):
          image(this.image, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2); // normal, 10frames
          break;
          case (this.progress%40 < 20):
          image(this.imageleft, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2); // walk left, 10f
          break;
          case (this.progress%40 < 30):
          if (this.name == "pi") {
            image(this.imagedown, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2);
          } else {
            image(this.image, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2); // normal, 10f
          }
          break;
          case (this.progress%40 < 40):
          image(this.imageright, this.x, this.y-textsize*2, this.textsize*2, this.textsize*2); // walk right, 10f
          break;
        }
      }
    } else {
      if (this.waiting) {
        image(this.image, this.x-textsize, this.y-textsize*2, this.textsize*2, this.textsize*2);
      } else if (this.fighting) {
        image(this.image, this.x-textsize, this.y-textsize*2, this.textsize*2, this.textsize*2);
      } else {
        switch(true) {
          case (this.progress%40 < 10):
          image(this.image, this.x-textsize, this.y-textsize*2, this.textsize*2, this.textsize*2); // normal, 10frames
          break;
          case (this.progress%40 < 20):
          image(this.imageleft, this.x-textsize, this.y-textsize*2, this.textsize*2, this.textsize*2); // walk left, 10f
          break;
          case (this.progress%40 < 30):
          image(this.image, this.x-textsize, this.y-textsize*2, this.textsize*2, this.textsize*2); // normal, 10f
          break;
          case (this.progress%40 < 40):
          image(this.imageright, this.x-textsize, this.y-textsize*2, this.textsize*2, this.textsize*2); // walk right, 10f
          break;
        }
      }
    }
  };
}

// unit structs

function UnitZero(base) {
  Unit.call(this, base);

  this.name = "0";
  this.damage = 0;
  this.health = 80;
}

function UnitOne(base) {
  Unit.call(this, base);

  this.name = "1";
  this.damage = 10;
  this.health = 50;
  this.totalhealth = 50;

  this.image = this.base.leftside ?  loadImage('data/good1.png') : loadImage('data/evil1.png');
  this.imageleft = this.base.leftside ? loadImage('data/good1left.png') : loadImage('data/evil1left.png');
  this.imageright = this.base.leftside ? loadImage('data/good1right.png') : loadImage('data/evil1right.png');

  this.fight = function() {
    fightMelee(this);
  };
}

function UnitTwo(base) {
  Unit.call(this, base);

  this.name = "2";
  this.health = 70;
  this.totalhealth = 70;
  this.damage = 18;

  this.image = this.base.leftside ?  loadImage('data/good2.png') : loadImage('data/evil2.png');

  this.imageleft = this.base.leftside ? loadImage('data/good2left.png') : loadImage('data/evil2right.png');
  this.imageright = this.base.leftside ? loadImage('data/good2right.png') : loadImage('data/evil2right.png');


  this.fight = function() {
    fightMelee(this);
  };
}

function UnitThree(base) { // ranged fighter
  Unit.call(this, base);

  this.name = "3";
  this.health = 30;
  this.totalhealth = 30;
  this.damage = 9;
  this.range = width/8;
  this.projectile = new Projectile(0, 0, 0, 0);

  this.image = this.base.leftside ?  loadImage('data/good3.png') : loadImage('data/evil3.png');
  this.imageleft = this.base.leftside ? loadImage('data/good3left.png') : loadImage('data/evil3left.png');
  this.imageright = this.base.leftside ? loadImage('data/good3right.png') : loadImage('data/evil3right.png');

  this.fight = function() {
    fightRanged(this);
  };
}

function UnitFour(base) {
  Unit.call(this, base);

  this.name = "4";
  this.health = 90;
  this.totalhealth = 90;
  this.damage = 18;
  this.range = width/15; // how close to the enemy the unit fights 
  this.weaponLength = width/12; // for piercing damage 

  this.image = this.base.leftside ?  loadImage('data/good4.png') : loadImage('data/evil4.png');
  this.imageleft = this.base.leftside ? loadImage('data/good4left.png') : loadImage('data/evil4left.png');
  this.imageright = this.base.leftside ? loadImage('data/good4right.png') : loadImage('data/evil4right.png');

  this.fight = function() { // eventually implement piercing damage (spear)
    fightPierce(this);
  };
}

function UnitFive(base) {
  Unit.call(this, base);

  this.name = "5";
  this.health = 175; // tank
  this.totalhealth = 175;
  this.damage = 12;

  this.image = this.base.leftside ?  loadImage('data/good5.png') : loadImage('data/evil5.png');
  this.imageleft = this.base.leftside ? loadImage('data/good5.png') : loadImage('data/evil5left.png');
  this.imageright = this.base.leftside ? loadImage('data/good5.png') : loadImage('data/evil5right.png');

  this.fight = function() {
    fightMelee(this);
  };
}

function UnitSix(base) { 
  Unit.call(this, base);

  this.name = "6";
  this.health = 100;
  this.totalhealth = 100;
  this.damage = 25;
  this.totalFightFrame = 150;
  this.attackFrame = 130;
  this.splashRange = width/60;

  this.image = this.base.leftside ?  loadImage('data/good6.png') : loadImage('data/evil6.png');
  this.imageleft = this.base.leftside ? loadImage('data/good6left.png') : loadImage('data/evil6left.png');
  this.imageright = this.base.leftside ? loadImage('data/good6right.png') : loadImage('data/evil6right.png');

  this.projectile = new Projectile(0, 0, 0, 0);
  this.projectile.shape = "circle";
  this.fight = function() { // medium, splash (bomb) damage
    fightSplash(this);
  };
}

function UnitSeven(base) {
  Unit.call(this, base);

  this.name = "7";
  this.health = 100;
  this.totalhealth = 100;
  this.damage = 0.20;
  this.flying = true;

  this.image = this.base.leftside ?  loadImage('data/good7.png') : loadImage('data/evil7.png');
  this.imageleft = this.base.leftside ? loadImage('data/good7.png') : loadImage('data/evil7.png');
  this.imageright = this.base.leftside ? loadImage('data/good7.png') : loadImage('data/evil7.png');

  this.fight = function() { // long cooldown, piercing fire breath
    fightDragon(this);
    this.move();
  };
}

function UnitEight(base) {
  Unit.call(this, base);

  this.name = "8";
  this.health = 350;
  this.totalhealth = 350;
  this.damage = 15;

  this.fight = function() { // medium cooldown, freezing ice attack
  };
}

function UnitNine(base) {
  Unit.call(this, base);

  this.name = "9";
  this.health = 300;
  this.totalhealth = 300;
  this.damage = 40;

  this.fight = function() { // medium cooldown ranged damage, long cooldown hypnosis attack
    // that converts enemy units 1, 2, 3 to other side
  };
}

function UnitPi(base) { 
  Unit.call(this, base);
  this.isnotPi = false;
  this.name = "pi";
  this.health = 5000000;
  this.totalhealth = 5000000;
  this.damage = 175;

  this.image = loadImage("data/pi.png");
  this.imageleft = loadImage("data/pileft.png");
  this.imageright = loadImage("data/piright.png");
  this.imagedown = loadImage("data/piupsidedown.png");

  this.fight = function() {
    fightMelee(this);
  };
}
