function DifficultyButtons(mathbar) {

  const MAXSCREENWIDTH = 1270;
  const MAXSCREENHEIGHT = 690;

  this.ypos = 2 * MAXSCREENHEIGHT/9;
  this.xpos = MAXSCREENWIDTH/3;
  this.XSCALE = MAXSCREENWIDTH/9;
  this.YSCALE = MAXSCREENHEIGHT/9;
  this.buttons = [];
  this.mathbar = mathbar;

  for (var i = 0; i < 3; i++) {
    let tex;
    switch(i) {
    case 0:
      tex = "Easy";
      break;
    case 1:
      tex = "Medium";
      break;
    default:
      tex = "Hard";
    }
    this.buttons[i] = new Button(this.xpos + i * this.XSCALE, this.ypos, this.XSCALE, this.YSCALE, tex);
    this.buttons[0].img = ONBUTTON;
  }

  this.render = function() {
    this.ypos = 4 * MAXSCREENHEIGHT/5;
    for (let i = 0; i < 3; i++) {
      this.buttons[i].render();
      this.buttons[i].renderText(36);
    }
  };

  this.problems = function() {
    // problem spawning code
    let i;   
    for (i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].clicked()) {
        this.mathbar.problemGen.curDif = i + 1;
        if(! this.mathbar.problemGen.isCooldown) {
          this.mathbar.problemGen.cooldownStart();
        }
        this.swi(i);
      }
    }
  };

  // only lights up on button
  this.swi = function(num) {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].img = OFFBUTTON;
    }
    this.buttons[num].img = ONBUTTON;
  };
}
