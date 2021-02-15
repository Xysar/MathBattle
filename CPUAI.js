const RAND = 0;
const SAVE = 1;
const HORDE = 2;
const DRAGON = 3;

function CPUAI(base, limit) {
  let time = millis();

  this.seconds = 16;

  this.coins = 0;
  this.base = base;
  this.mode = RAND;
  this.limit = limit;
  this.high = 2;

  this.onTimer = function() {
    if (millis() - time >= this.seconds * 1000) {
      // adds coin
      this.coins += Math.floor(random(1, this.high/2))*2;
      console.log("$ = " + this.coins);
      
      // code for spawning units
      let u = this.run();
      if(u != null) {
        yourBase.addUnit(u);
        console.log("$ = " + this.coins);
      }
      
      time = millis();
    }
    if(this.base.enemyDied != ""){
      this.coins += dropGold(this.base.enemyDied);
    }
  };

  this.spawnUnit = function(num) {
    if (this.coins >= num && base.units.length < 20) {
      this.coins -= num;
      switch(num) {
      case 1:
        return new UnitOne(this.base);
      case 2:
        return new UnitTwo(this.base);
      case 3:
        return new UnitThree(this.base);
      case 4:
        return new UnitFour(this.base);
      case 5:
        return new UnitFive(this.base);
      case 6:
        return new UnitSix(this.base);
      case 7:
        return new UnitSeven(this.base);
      default:
        return null;
      }
    }
    return null;
  };

  // cpu randomly spawns units
  this.randomMode = function() {
    let rand = Math.floor(random(1, this.limit+1));
    return this.spawnUnit(rand);
  };

  // cpu saves money and prefers larger units
  this.saveMode = function() {
    let rand = Math.floor(random(5, this.limit));
    return this.spawnUnit(rand);
  };

  // helper function for saveMode
  this.sum = function(num) {
    let ret = 0;
    for (let i = 1; i <= num; i++) {
      ret += 1;
    }
    return ret;
  };

  // cpu spends money and only buys 1s and 2s
  this.hordeMode = function() {
    let rand = Math.floor(random(1, 3));
    return this.spawnUnit(rand);
  };

  // cpu spawns 3s to deal with dragons
  this.dragonMode = function() {
    return this.spawnUnit(3);
  };

  // runs code for whichever mode
  this.runProcesses = function() {
    switch(this.mode) {
    case RAND: 
      return this.randomMode();
    case SAVE:
      return this.saveMode();
    case HORDE:
      return this.hordeMode();
    case DRAGON:
      return this.dragonMode();
    default:
      break;
    }
  };

  // returns true if the enemy has a level 7 unit
  this.isDragon = function() {
    for(let i = 0; i < this.base.enemyBase.units.length; i++) {
      if(this.base.enemyBase.units[i] instanceof UnitSeven) {
        return true;
      }
    }
    return false;
  };

  this.run = function() {
  };
}



function LevelOne(base) {
  CPUAI.call(this, base, 4);

  this.run = function() {
    return this.runProcesses();
  };
}

function LevelTwo(base) {
  CPUAI.call(this, base, 6);
  this.seconds = 14;
  this.high = 4;
  this.coins = 5;

  this.run = function() {
    let x = Math.floor(random(3));
    this.mode = x === 0 ? SAVE : RAND;
    console.log(this.mode);
    return this.runProcesses();
  };
}

function LevelThree(base) {
  CPUAI.call(this, base, 7);
  this.seconds = 12;
  this.high = 4;
  this.coins = 5;

  this.run = function() {
    let x = Math.floor(random(3));
    switch(x) {
    case 0:
      this.mode = RAND;
      break;
    case 1:
      this.mode = SAVE;
      break;
    case 2:
      this.mode = HORDE;
    }
    return this.runProcesses();
  };
}

function LevelFour(base) {
  CPUAI.call(this, base, 8);
  this.seconds = 10;
  this.high = 4;
  this.coins = 7;
  
  this.run = function() {
    if (this.isDragon()) {
      this.mode = DRAGON;
    } else {
      let x = Math.floor(random(3));
      switch(x) {
      case 0:
        this.mode = RAND;
        break;
      case 1:
        this.mode = SAVE;
        break;
      case 2:
        this.mode = HORDE;
      }
    }
    return this.runProcesses();
  };
}

function LevelFive(base) {
  CPUAI.call(this, base, 9);
  this.seconds = 8;
  this.high = 6;
  this.coins = 10;
  
  let m = Math.floor(random(2));
   
  this.run = function() {
    if (this.isDragon()) {
      this.mode = DRAGON;
    } else {
      this.mode = m == 0 ? SAVE : HORDE;
    }
  
    return this.runProcesses();
  };
}
