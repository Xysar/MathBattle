function MathProblem(aLim, mLim, eLim, gold) {
  // difficulty should only be from 1-3
  // roundTo should only be numbers 10^n where n is a non-negative integer function Problem(aLim, mLim, eLim = 1) {
  this.aLim = aLim;
  this.mLim = mLim;
  this.eLim = eLim;
  this.gold = gold;

  // randomly select problem type
  let type = Math.floor(random(6));

  switch(type) {
  case 0:
    this.gen = new AddGen(this.aLim);
    break;
  case 1:
    this.gen = new SubGen(this.aLim);
    break;
  case 2:
    this.gen = new MultGen(this.mLim);
    break;
  case 3:
    this.gen = new DivGen(this.mLim);
    break;
  case 4:
    this.gen = new ExpGen(this.eLim);
    break;
  default:
    this.gen = new VarGen(this.mLim, this.aLim);
  }

  this.display = function() {
    return this.gen.toStr();
  };
}

function ProblemGenerator(base) {
  this.base = base;
  this.curDif = 1;
  this.isCooldown = false;
  // select one of the preset difficulties
  let aLim;
  let mLim;
  let eLim;
  let roundTo;

  // dif must be 1, 2, or 3
  this.newProblem = function(dif) {
    this.curDif = dif;
    switch(this.curDif) {
    case 1:
      aLim = [-20, 20];
      mLim = [-1, 10];
      eLim = [0, 2];
      break;
    case 2:
      aLim = [-100, 100];
      mLim = [-20, 20];
      eLim = [2, 4];
      break;
    default:
      aLim = [-1000, 1000];
      mLim = [-25, 25];
      eLim = [2, 10];
    }

    this.problem = new MathProblem(aLim, mLim, eLim, this.curDif);
  };

  this.display = function() {
    if(this.isCooldown) {
      return this.cooldown();
    }
    else {
      return this.problem.display();
    }
  };

  this.whenSolved = function() {
    this.base.gold.incrGold(this.problem.gold * 2);
  };

  this.check = function (num) {
    if (!this.isCooldown && (num === this.problem.gen.z || (this.problem.gen instanceof VarGen && this.problem.gen.y === 0))) {
      this.whenSolved();
      this.cooldownStart();
      console.log("Right!");
      return true;
    } else {
      console.log("Wrong!");
      return false;
    }
  };
  
  let t;
  let d;
  
  const CHAR = 'o';
  const DELAY = 500;
  this.cooldownStart = function() {
    this.isCooldown = true;
    t = millis();
    d = CHAR + ' ';
  };
  
  this.cooldown = function() {
    if(d.length > 28 && millis() - t > DELAY) {
        this.newProblem(this.curDif);
        this.isCooldown = false;
        return this.problem.display();
    }
    else if(millis() - t > DELAY) {
      t = millis();
      d += ' ' + CHAR + ' ';
      return d + "\nLoading...";
    }
    else {
      return d + "\nLoading...";
    }
  };
  
  this.newProblem(this.curDif);
}

// interface for all gens
function NumGen(lim, template = null) {
  this.x = Math.floor(random(lim[0], lim[1]));
  this.y = Math.floor(random(lim[0], lim[1]));
  //this.z = NaN;
  //this.w = NaN;
  this.template = template;

  this.toStr = function() {
    let str = this.template;
    str = str.replace("{w}", this.w);
    str = str.replace("{x}", this.x);
    str = str.replace("{y}", this.y);
    str = str.replace("{z}", this.z);
    return str;
  };

  this.setTemplate = function(t) {
    this.template = t;
  };
}

// x + y = z or x - y = z
// also functions for subtraction
function AddGen(lim, template = "{x} + {y} = ") {
  NumGen.call(this, [0, lim[1]], template);
  this.z = this.x + this.y;
}

function SubGen(lim, template = "{x} - {y} = ") {
  NumGen.call(this, [lim[0], 0], template);
  this.z = this.x + this.y;
  this.y = -1 * this.y;
}

// x * y = z
function MultGen(lim, template = "{x} * {y} = ") {
  NumGen.call(this, lim, template);
  this.z = this.x * this.y;
}

// y * z = x or x / y = z
function DivGen(lim, template = "{x} / {y} = ") {
  MultGen.call(this, lim, template);
  let temp = this.x;
  this.x = this.z;
  this.z = temp;
  // deals with divide by 0 errors
  if (this.y === 0) {
    this.y = Math.floor(random(1, lim[1]));
    this.z = 0;
  }
}

// x^rand(1,5) = z
function ExpGen(lim, template = "{x} ^ {y} = ") {
  NumGen.call(this, lim, template);
  this.y = Math.floor(random(0, 5));
  this.z = Math.pow(this.x, this.y);
}

// xy + w = z + w = z prime
function VarGen(lim, lim2, template = "{y}x + {w} = {x}\tx = ") {
  MultGen.call(this, lim, template);
  this.w = Math.floor(random(lim2[1]));
  this.z += this.w;
  let temp = this.x;
  this.x = this.z;
  this.z = temp;

  // if y === 0, x can be anything
}
