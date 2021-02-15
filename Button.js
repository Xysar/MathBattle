function Button (x, y, w, h, tex) {
  const MAXSCREENWIDTH = 1270;
  const MAXSCREENHEIGHT = 690;
  
  this.x = x / MAXSCREENWIDTH * width;
  this.y = y / MAXSCREENHEIGHT * height;
  this.w = w / MAXSCREENWIDTH * width;
  this.h = h / MAXSCREENHEIGHT * height;
  this.TEXTX = x + w/2; //coordinates so that text can be placed in center of Button, example of implementation is on lvlMenu, and mainMenu
  this.TEXTY = y + h/2 + 5;
  this.tex = tex;
  this.img = OFFBUTTON;

  this.clicked = function() {
    if ((mouseX <= (this.x + this.w)) && (mouseX >= this.x) && (mouseY <= (this.y + this.h)) && (mouseY >= this.y)) { 
      return true;
    } else {
      return false;
    }
  };
  
  this.render = function() {
    this.w = w / MAXSCREENWIDTH * width;
    this.h = h / MAXSCREENHEIGHT * height;
    this.x = x / MAXSCREENWIDTH * width;
    this.y = y / MAXSCREENHEIGHT * height;
    this.TEXTX = this.x + this.w/2; //coordinates so that text can be placed in center of Button, example of implementation is on lvlMenu, and mainMenu
    this.TEXTY = this.y + this.h/2 + 5;
    fill(255);
    image(this.img, this.x, this.y, this.w, this.h);
  };
  
  this.renderText = function (size) {
    this.size = size / MAXSCREENWIDTH * width;
    textAlign(CENTER,CENTER);
    fill(0);
    textSize(this.size);
    text(this.tex, this.TEXTX, this.TEXTY);
  };
}
