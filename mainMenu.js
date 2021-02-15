function mainMenu(bg, font, title, w, h) {
  const MAXSCREENWIDTH = 1270;
  const MAXSCREENHEIGHT = 690;

  this.bg = bg;
  this.font = font;
  this.title = title;
  this.w = w;
  this.h = h;
  let scrnx = MAXSCREENWIDTH;
  let scrny = MAXSCREENHEIGHT;
  const PLAYBUTX = ((scrnx/2)-w/2); //coordinates of play button
  const PLAYBUTY = ((scrny/2)-100);
  const LVLBUTX = ((scrnx/2)-w/2); //coordinates of level select button
  const LVLBUTY = ((scrny/2));

  this.playBut = new Button(PLAYBUTX, PLAYBUTY, w, h, "Play Game"); //Play button
  this.lvlBut =  new Button(LVLBUTX, LVLBUTY, w, h, "Level Select"); //Level select button
  this.tutBut = new Button(LVLBUTX, LVLBUTY + 100, w, h, "Tutorial");
  this.credBut = new Button(LVLBUTX, LVLBUTY + 200, w, h, "Credits");

  this.render = function() {
    scrnx = document.body.clientWidth;
    scrny = document.body.clientHeight;
    background(bg); 
    image(title, (scrnx/2)-235, 100); 
    this.playBut.render();
    this.playBut.renderText(50);
    this.lvlBut.render();
    this.lvlBut.renderText(50);
    this.tutBut.render();
    this.tutBut.renderText(50);
    this.credBut.render();
     this.credBut.renderText(50);
  };
}
