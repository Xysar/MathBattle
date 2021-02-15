function PauseMenu(w, h) {
  this.w = w;
  this.h = h;
  const MAXSCREENWIDTH = 1270;
  const MAXSCREENHEIGHT = 690;
  const PAUSEBUTX = MAXSCREENWIDTH/12; //coordinates of level select button
  const PAUSEBUTY = MAXSCREENHEIGHT/6;
  const RESBUTX = MAXSCREENWIDTH*11/24;
  const RESBUTY = MAXSCREENHEIGHT/16;
  const MENUBUTX = MAXSCREENWIDTH*11/24;
  const MENUBUTY = MAXSCREENHEIGHT/8;

  this.resBut = new Button(RESBUTX, RESBUTY, w/4, h/2, "Resume"); //Play button
  this.pauseBut = new Button(PAUSEBUTX, PAUSEBUTY, w/8, h*3/4, "|  |"); //Pause Button
  this.menuBut = new Button(MENUBUTX, MENUBUTY, w/4, h/2, "Main Menu");

  this.renderPause = function() {
    this.pauseBut.render();
    this.pauseBut.renderText(20);
  };

  this.gameState = function(myHUD, yourHUD, mathbar, myBase, yourBase, buttons) {
    myHUD.render();
    yourHUD.render();
    mathbar.render();
    myBase.render();
    yourBase.render();
    buttons.render();
    myBase.renderUnits();
    yourBase.renderUnits();
  };

  this.render = function() {
    let xsize = width/3;
    let ysize = height/4;
    rectMode(CENTER);
    fill(255);
    rect(width/2, ysize/2, xsize, ysize);
    rectMode(CORNER);
    if (this.resBut.clicked()) {
      this.resBut.img = ONBUTTON;
    } else {  
      this.resBut.img = OFFBUTTON;
    }
    if (this.menuBut.clicked()) {
      this.menuBut.img = ONBUTTON;
    } else {  
      this.menuBut.img = OFFBUTTON;
    }
    this.resBut.render();
    this.resBut.renderText(15);
    this.menuBut.render();
    this.menuBut.renderText(15);
  };
}
