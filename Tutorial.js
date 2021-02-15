function Tutorial(w, h) {
  this.counter = 0;
  const MAXSCREENWIDTH = 1270;
  const MAXSCREENHEIGHT = 690;

  this.exHUD = new HUD(true, 100);
  this.exBase = new Base("Player", true, this.exHUD, goodbase);
  this.enemyHUD = new HUD(false, 100);
  this.enemyBase = new Base("CPU", false, this.enemyHUD, evilbase);
  this.exBar = new Mathbar(this.exBase);
  this.diButtons = new DifficultyButtons(this.exBar);
  this.exBase.setEnemyBase(this.enemyBase);
  this.enemyBase.setEnemyBase(this.exBase);

  this.incrCount = function() {
    this.counter++;
    switch(this.counter) {
    case 6:
      let test = new UnitOne(this.exBase);
      test.speed = 10;
      let test2 = new UnitOne(this.enemyBase);
      test2.speed = 10;
      this.exBase.addUnit(test);
      this.enemyBase.addUnit(test2);
      break;
    case 7:
      this.exBase.addUnit(new UnitTwo(this.exBase));
      this.enemyBase.addUnit(new UnitTwo(this.enemyBase));
      break;
    case 8:
      this.exBase.addUnit(new UnitThree(this.exBase));
      this.enemyBase.addUnit(new UnitThree(this.enemyBase));
      break;
    case 9:
      this.exBase.addUnit(new UnitFour(this.exBase));
      this.enemyBase.addUnit(new UnitFour(this.enemyBase));
      break;
    case 10:
      this.exBase.addUnit(new UnitFive(this.exBase));
      this.enemyBase.addUnit(new UnitFive(this.enemyBase));
      break;
    case 11:
      this.exBase.addUnit(new UnitSix(this.exBase));
      this.enemyBase.addUnit(new UnitSix(this.enemyBase));
      break;
    case 12:
      this.exBase.addUnit(new UnitSeven(this.exBase));
      this.enemyBase.addUnit(new UnitSeven(this.enemyBase));
      break;
    case 13:
      this.exBase.addUnit(new UnitPi(this.exBase));
      this.enemyBase.addUnit(new UnitPi(this.enemyBase));
      break;
    }
  };



  this.render = function() { //myHUD, yourHUD, mathbar, myBase, yourbase, buttons
    rectMode(CENTER, CENTER);
    textAlign(CENTER, CENTER);
    textSize(20);
    switch(this.counter) {
    case 0:
      fill(255);
      rect(width/2, height/2, w/2, h*2);
      fill(0);
      text("Welcome to the \n Tutorial \n Click to continue", width/2, (height/2));
      this.diButtons.render();
      break;
    case 1:

      fill(255);
      rect(width/4, height/2, w/2, h*2);
      rect(width*3/4, height/2, w/2, h*2);
      fill(0);
      text("This is your base. \n You must \n defend it against\n the enemy ", width/4, (height/2));
      text("And this is the \n enemy base. It will \n send units to \n attack your base", width*3/4, (height/2));
      this.diButtons.render();
      break;
    case 2:
      this.diButtons.render();
      fill(255);
      rect(width/2, height/3, w, h*2);
      fill(0);
      textSize(20);
      text("Math problems will show up here that \n you can answer to gain gold \n which you can use to buy units.", width/2, (height/3));

      break;
    case 3:

      fill(255);
      rect(width/2, height/2, w, h*2);
      fill(0);
      textSize(20);
      text("The buttons 'Easy, Medium, Hard' \n change how hard the problems are.\n -Harder questions give more gold.\n -They have cooldown timers", width/2, (height*1/2));
      this.diButtons.render();
      break;
    case 4:
      this.diButtons.render();
      fill(255);
      rect(width/3, height/3, w*2/3, h*2);
      rect(width*2/3, height/3, w*2/3, h*2);
      fill(0);
      textSize(20);
      text("In the upper left is your \n health! If enemy units\n reach your base \n you will lose health.\n If it reaches 0, it's game over", width/3, (height/3));
      text("But if your troops can \n reach the enemy base\n they will lose health instead.\n If they lose all theirs, you win!", width*2/3, (height/3));
      break;
    case 5:
      fill(255);
      rect(width/2, height*2/3, w, h*2);
      fill(0);
      text("Down here are the unit buttons. \n Click on a number to summon it\n and have it fight for you. You must \n have enough gold to buy them though.\n -They have cooldown timers", width/2, (height*2/3));
      this.diButtons.render();
      break;
    case 6:

      fill(255);
      rect(width/2, height*1/2, w*3/4, h);
      fill(0);
      text("Unit 1 is a weak, melee unit", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.diButtons.render();
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    case 7:
      fill(255);
      rect(width/2, height*1/2, w, h);
      fill(0);
      text("Unit 2 is a stronger, tankier melee unit", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    case 8:
      fill(255);
      rect(width/2, height*1/2, w, h);
      fill(0);
      text("Unit 3 is a ranged unit", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    case 9:
      fill(255);
      rect(width/2, height*1/2, w, h);
      fill(0);
      text("Unit 4 is a melee unit that can attack \n multiple units in front of them", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    case 10:
      fill(255);
      rect(width/2, height*1/2, w, h);
      fill(0);
      text("Unit 5 is a tanky melee unit \n that can absorb plenty of attacks", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    case 11:
      fill(255);
      rect(width/2, height*1/2, w, h);
      fill(0);
      text("Unit 6 is a ranged unit \n that throws bombs that\n deal area of effect damage", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    case 12:
      fill(255);
      rect(width/2, height*1/2, w, h);
      fill(0);
      text("Unit 7 is a flying unit \n that attacks enemies below. \n It can only be hit by ranged units", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    case 13:
      fill(255);
      rect(width/2, height*1/2, w, h);
      fill(0);
      text("Unit Pi is a unit \n that destroys all the enemy units. \n It's expensive though", width/2, (height*1/2));
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      break;
    default:
      rectMode(CORNER);
      textAlign(CORNER);
      this.exBase.render();
      this.exBase.renderUnits();
      this.exBase.moveUnits();
      this.enemyBase.render();
      this.enemyBase.renderUnits();
      this.enemyBase.moveUnits();
      this.diButtons.render();
      rectMode(CENTER, CENTER);
      textAlign(CENTER, CENTER);
      fill(255);
      rect(width*3/10, height*1/5, w/2, h*2);
      rect(width/5, height*4/5, w/2, h*2);
      fill(0);
      textSize(20);
      text("Finally in the top \n left is your gold.", width*3/10, (height*1/5));
      text("Press back \n to exit the tutorial!", width/5, (height*4/5));
      for (i = 0; i<this.exBase.units.length; i++) {
        this.exBase.removeUnit(this.exBase.units[i]);
      }
      for (i = 0; i<this.enemyBase.units.length; i++) {
        this.enemyBase.removeUnit(this.enemyBase.units[i]);
      }
      break;
    }

    rectMode(CORNER);
  };
}
