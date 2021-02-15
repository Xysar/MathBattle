function Unitbuttons(base) {

  const MAXSCREENWIDTH = 1270;
  const MAXSCREENHEIGHT = 690;

  this.ypos = 4 * MAXSCREENHEIGHT/5;
  this.XSCALE = MAXSCREENWIDTH/8;
  this.YSCALE = MAXSCREENHEIGHT/5;
  this.buttons = [];
  this.base = base;
  this.timer = [];
  this.pause = true;

  for (var i = 0; i < 8; i++) {
    let tex;
    switch(i) {
    case 7:
      tex = "π";
      break;
    default:
      tex = i+1;
    }
    this.buttons[i] = new Button(i * this.XSCALE, this.ypos, this.XSCALE, this.YSCALE, tex);
    this.timer[i] = millis();
  }

  this.render = function() {
    //this.ypos = 4 * MAXSCREENHEIGHT/5;
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].render();
      this.buttons[i].renderText(36);
    }
  };

  this.hovered = function() {
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].clicked()) {
        if(millis() > this.timer[i]) {
          this.buttons[i].img = ONBUTTON;
        } else {
          this.buttons[i].img = COOLBUTTON;
        }
        fill(255);
        rect(mouseX, mouseY, width/12, height/10);
        fill(0);
        textSize(width/80);

        switch(i+1) {
        case 1:
          text("Weak, melee \n unit\n", mouseX+width/12/2, mouseY+height/10/2);
          if (this.base.gold.total < (i+1)) {
            fill(255, 0, 0);
          }
          text("\n \n Cost: " + (i + 1), mouseX+width/12/2, mouseY+height/10/2);
          break;
        case 2:
          text("Strong, melee \n unit\n", mouseX+width/12/2, mouseY+height/10/2);
          if (this.base.gold.total < (i+1)) {
            fill(255, 0, 0);
          }
          text("\n \n Cost: " + (i + 1), mouseX+width/12/2, mouseY+height/10/2);
          break;
        case 3:
          text("Weak, ranged \n unit\n", mouseX+width/12/2, mouseY+height/10/2);
          if (this.base.gold.total < (i+1)) {
            fill(255, 0, 0);
          }
          text("\n \n Cost: " + (i + 1), mouseX+width/12/2, mouseY+height/10/2);
          break;
        case 4:
          fill(255);
          rect(mouseX, mouseY, width/6, height/10);
          fill(0);
          text("Strong, melee unit.\n Attacks multiple enemies \n", mouseX+width/6/2, mouseY+height/10/2);
          if (this.base.gold.total < (i+1)) {
            fill(255, 0, 0);
          }
          text("\n \n Cost: " + (i + 1), mouseX+width/6/2, mouseY+height/10/2);
          break;
        case 5:
          text("Tanky melee \n unit\n", mouseX+width/12/2, mouseY+height/10/2);
          if (this.base.gold.total < (i+1)) {
            fill(255, 0, 0);
          }
          text("\n \n Cost: " + (i + 1), mouseX+width/12/2, mouseY+height/10/2);
          break;
        case 6:
          fill(255);
          rect(mouseX, mouseY, width/6, height/10);
          fill(0);
          text("Bomber\n", mouseX+width/6/2, mouseY+height/10/2);
          if (this.base.gold.total < (i+1)) {
            fill(255, 0, 0);
          }
          text("\nCost: " + (i + 1), mouseX+width/6/2, mouseY+height/10/2);
          break;
        case 7:
          text("Dragon\n", mouseX+width/12/2, mouseY+height/10/2);
          if (this.base.gold.total < (i+1)) {
            fill(255, 0, 0);
          }
          text("\nCost: " + (i + 1), mouseX+width/12/2, mouseY+height/10/2);
          break;
        case 8:
          text("Pi\n", mouseX+width/12/2, mouseY+height/10/2);
          if (this.base.gold.total < 14) {
            fill(255, 0, 0);
          }
          text("\nCost: 14", mouseX+width/12/2, mouseY+height/10/2);
          break;
        default:
          break;
        }
        noFill();
      } else {
        if(millis() > this.timer[i]) {
          this.buttons[i].img = OFFBUTTON;
        } else {
          this.buttons[i].img = COOLBUTTON;
        }
      }
    }
  };

  this.spawns = function() {
    // unit button pressing/unit spawning code
    let i;   
    for (i = 0; i < this.buttons.length - 1; i++) {
      if (this.buttons[i].clicked() && this.base.gold.total > i && millis() > this.timer[i]) {
        this.setCooldown(i);
        switch(i) {
        case 0:
          this.base.addUnit(new UnitOne(this.base));
          break;
        case 1:
          this.base.addUnit(new UnitTwo(this.base));
          break;
        case 2:
          this.base.addUnit(new UnitThree(this.base));
          break;
        case 3:
          this.base.addUnit(new UnitFour(this.base));
          break;
        case 4:
          this.base.addUnit(new UnitFive(this.base));
          break;
        case 5:
          this.base.addUnit(new UnitSix(this.base));
          break;
        case 6:
          this.base.addUnit(new UnitSeven(this.base));
          break;
        default:
          break;
        }
        this.base.gold.decrGold(i+1);
      }
    }
    if (this.buttons[7].clicked() && this.base.gold.total > 13 && millis() > this.timer[7]) {
      this.base.addUnit(new UnitPi(this.base));
      this.base.gold.decrGold(14);
    }
  };

  this.setCooldown = function(i) {
    switch(i) {
    case 0:
      this.timer[i] = millis() + 1000;
      break;
    case 1:
      this.timer[i] = millis() + 2000;
      break;
    case 2:
      this.timer[i] = millis() + 3000;
      break;
    case 3:
      this.timer[i] = millis() + 4000;
      break;
    case 4:
      this.timer[i] = millis() + 5000;
      break;
    case 5:
      this.timer[i] = millis() + 6000;
      break;
    case 6:
      this.timer[i] = millis() + 7000;
      break;
    case 7:
      this.timer[i] = millis() + 8000;
      break;
    }
  };
}
