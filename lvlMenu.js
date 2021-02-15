function lvlMenu(bg, w, h) {

  const MAXSCREENWIDTH = 1270;
  const MAXSCREENHEIGHT = 690;
  const BACKBUTX = w/16;
  const BACKBUTY = MAXSCREENHEIGHT*6/8;
  const LVLBUTX = ((MAXSCREENWIDTH/2)-200); //coordinates of level select button
  const LVLBUTY = ((MAXSCREENHEIGHT/2));
  this.w = w;
  this.h = h;
  this.lvlsBut = [];
  this.LEVELS = 4;
  this.curLevel = 1;
  this.string = 'Level ';
  this.bg = bg;
  for (let i = 0; i < this.LEVELS; i++) {
    this.lvlsBut.push(new Button(LVLBUTX, ((LVLBUTY + 100) - 100*i), w, h, this.string + (4-i)));
  }
  this.backBut = new Button(BACKBUTX, BACKBUTY, w/4, h/2, "Back"); //Play button
  this.lvlsBut[3].img = ONBUTTON;

  this.render = function() {
    background(this.bg);
    for (let i = 0; i < this.LEVELS; i++) {
      this.lvlsBut[i].render();
      this.lvlsBut[i].renderText(50);
    }
    if (this.backBut.clicked()) {
      this.backBut.img = ONBUTTON;
    } else {
      this.backBut.img = OFFBUTTON;
    }
    this.backBut.render();
    this.backBut.renderText(15);
  };

  // only lights up on button
  this.swi = function(num) {
    for (let i = 0; i < this.lvlsBut.length; i++) {
      this.lvlsBut[i].img = OFFBUTTON;
    }
    this.lvlsBut[num].img = ONBUTTON;
  };
}
