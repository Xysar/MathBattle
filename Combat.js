function fightMelee(unit){
  if (unit.curFightFrame == unit.attackFrame) {
      unit.dealDamage();
    }
    if (unit.curFightFrame == unit.totalFightFrame) {
      unit.curFightFrame = 0;
    }
    unit.curFightFrame++;
} 

function Projectile(x, y, pwidth, plength) {
  // this.img = img;
  this.x = x;
  this.y = y;

  this.pwidth = pwidth;
  this.plength = plength;
  this.shape = "rect";

  this.render = function(rotation) {
    fill(0);
    if(this.shape === "rect"){
      rect(this.x, this.y, this.pwidth, this.plength);
    }
    else if(this.shape === "circle"){
      circle(this.x, this.y, this.pwidth);
    }
};
}

function getUnitsInRadius(unit, centerX, radius){ // returns array of enemy units at centerX + or - radius 
  let unitsInside = [];
  let allUnits = unit.base.enemyBase.units;
  let aoeMIN = centerX-radius;
  let aoeMAX = centerX+radius;
  let numUnits = 0;
  
  for(i = 0; i<allUnits.length; i++){
     if(allUnits[i].x >= aoeMIN && allUnits[i].x <= aoeMAX){
       unitsInside[numUnits] = allUnits[i];
       numUnits++;
     }
  }
  return unitsInside;
}

function fightPierce(unit){
  
  if (unit.curFightFrame == unit.attackFrame) {
      let unitsHit = unit.base.leftside ? getUnitsInRadius(unit, unit.x+(unit.weaponLength/2), unit.weaponLength/2): getUnitsInRadius(unit, unit.x-(unit.weaponLength/2), unit.weaponLength/2);
      for(i = 0; i<unitsHit.length; i++){
        unitsHit[i].health -= unit.damage;
      }
    }
    if (unit.curFightFrame == unit.totalFightFrame) {
      unit.curFightFrame = 0;
    }
    unit.curFightFrame++;
}

function fightAntiAir(unit){
  if(unit.curFightFrame == 0){
    unit.projectile.pwidth = 30;
    unit.projectile.pheight = 10;
    unit.projectile.x = unit.base.leftside ? unit.x : unit.x-unit.projectile.pwidth;
    unit.projectile.y = unit.y-unit.textsize;
    unit.curTarget = unit.getClosestEnemy();
  }
  
  if(unit.getClosestEnemy() != unit.curTarget){
    unit.curFightFrame = -1; // adds one at the end, will be 0
    // target has already been slain 
  }
  
  else if(unit.curFightFrame >= 50){
    let dx = unit.base.leftside ? unit.curFightFrame/4 : -1*unit.curFightFrame/4;
    dx *= unit.compareUnit(unit.curTarget) < 20 ? -1 : 1;
    let dy = unit.curFightFrame/4;
    
    unit.projectile.x += dx;
    unit.projectile.y -= dy;
    unit.projectile.render(0);
    
   }
  
  
  
  if(unit.curFightFrame >= 54){
    unit.dealDamage();
    unit.curFightFrame = -1;
    // direct hit! starting over
  }
  
    unit.curFightFrame++;
    // waiting...
  
}
  
  

function fightRanged(unit) { 
  
  if(unit.getClosestEnemy().flying){
    fightAntiAir(unit);
  }
  
  else{
  
  if (unit.curFightFrame ==  0) {
    unit.projectile.pwidth = 30;
    unit.projectile.pheight = 10;
    unit.projectile.x = unit.base.leftside ? unit.x : unit.x-unit.projectile.pwidth;
    unit.projectile.y = unit.y-unit.textsize;
    unit.curTarget = unit.getClosestEnemy();
    // preparing to fire!
  }
  if(unit.getClosestEnemy() != unit.curTarget){
    unit.curFightFrame = -1; // adds one at the end, will be 0
    // target has already been slain 
  }
  if (unit.curFightFrame >= 50) {
    let dx = unit.base.leftside ? unit.curFightFrame/4 : -1*unit.curFightFrame/4;
    unit.projectile.x += dx;
    unit.projectile.render(0);
    // projectile lauched!
  }
  // wow these are horrible to read will clean them up later 
  let tipOfProjectilex = unit.base.leftside ? unit.projectile.x+unit.projectile.pwidth : unit.projectile.x-unit.projectile.pwidth;
  let enemyHit = unit.base.leftside ? tipOfProjectilex >= unit.curTarget.x : tipOfProjectilex <= unit.curTarget.x;
  
  if(unit.compareUnit(unit.curTarget) > unit.range){
    unit.curFightFrame = 0;
  }
  
  else if(enemyHit){
    unit.dealDamage();
    unit.curFightFrame = 0;
    // direct hit! starting over
  } else { 
    unit.curFightFrame++;
    // waiting...
  }
  }
}

function fightSplash(unit){ // needs fixing: bombs go to far in minimized window due to total fight frames being too high 
  if(unit.curFightFrame == 0){
    unit.projectile.pwidth = width/75;
    unit.projectile.pheight = 10;
    unit.projectile.x = unit.base.leftside? unit.x+unit.projectile.pwidth : unit.x-unit.projectile.pwidth;
    unit.projectile.y = unit.y-unit.textsize;
    unit.curTarget = unit.getClosestEnemy();
    
    
  }
  
  if (unit.curFightFrame >= unit.attackFrame) {
    let dx = unit.base.leftside ? unit.attackFrame/20 : -1*unit.attackFrame/20;
    
    unit.projectile.x += dx;
    unit.projectile.y = unit.y-unit.textsize;
    
    unit.projectile.render(0);
    // projectile lauched!
  }
  
  let tipOfProjectilex = unit.base.leftside ? unit.projectile.x-unit.projectile.pwidth : unit.projectile.x+unit.projectile.pwidth;
  let enemyHit = unit.base.leftside ? tipOfProjectilex >= unit.curTarget.x : tipOfProjectilex <= unit.curTarget.x;
  if(enemyHit){
    let unitsHit = getUnitsInRadius(unit, unit.projectile.x, unit.splashRange);
      for(i = 0; i<unitsHit.length; i++){
        if(unitsHit[i].flying == false){
        unitsHit[i].health -= unit.damage;
        }
      }
      unit.curFightFrame = 0;
  }
  
  else{
    unit.curFightFrame++;
  }
}

function fightDragon(unit){
  
      let unitsHit = unit.base.leftside ? getUnitsInRadius(unit, unit.x+(unit.weaponLength), unit.weaponLength/2): getUnitsInRadius(unit, unit.x-(unit.weaponLength/2), unit.weaponLength/2);
      for(i = 0; i<unitsHit.length; i++){
        unitsHit[i].health -= unit.damage;
    }
}

  
  
