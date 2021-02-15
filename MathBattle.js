let myBase;
let yourBase;
let myHUD;
let yourHUD;
let mathbar;
let uButtons;
let dButtons;
let maintheme;
let forest;
let desert; 
let ice;
let lava;
let cursong;
let goldcoin;
let lastchar = '';
let forestbackground;
let desertbackground;
let icebackground;
let lavabackground;
let curbackground;
let curbackgroundcolor;

let testUnit;

let mode; // Dictates which screen is displayed: 0 = Main Menu, 1 = Actual Game, 2 = Level Select
let bg;
let title;
let font;
let menu;
let lvlselect;
let pause;
let tutorial;

let ai;

let backToMenu = false;

var ONBUTTON;
var OFFBUTTON;
var COOLBUTTON;

const BUTTONW = 400; //width of all buttons on main menu
const BUTTONH = 75; //height of all buttons on main menu

// controls
// type any number to enter numbers into the text bar
// type backspace to delete one number
// type delete to clear the text bar


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  mode = 20;
  menu = new mainMenu(bg, font, title, BUTTONW, BUTTONH);
  pause = new PauseMenu(BUTTONW, BUTTONH);
  lvlselect = new lvlMenu(bg, BUTTONW, BUTTONH);
  tutorial = new Tutorial(BUTTONW, BUTTONH);
  myHUD = new HUD(true, 100);
  yourHUD = new HUD(false, 100);

  forest.stop();
  desert.stop();
  ice.stop();
  lava.stop();

  myBase = new Base("Player", true, myHUD, goodbase);
  yourBase = new Base("CPU", false, yourHUD, evilbase);

  myBase.setEnemyBase(yourBase);
  yourBase.setEnemyBase(myBase);
  ai = new LevelOne(yourBase);
  curbackground = forestbackground;


  mathbar = new Mathbar(myBase);
  uButtons = new Unitbuttons(myBase);
  dButtons = new DifficultyButtons(mathbar);
}

function preload() {
  // font = loadFont('assets/cafe.otf');//Keeping in case I can fix later, but do not uncomment or else program runs incredibly slow.
  bg = loadImage('assets/chalk.jpg');
  title = loadImage('assets/writing.png');
  goodbase = loadImage('data/goodbase.png');
  evilbase = loadImage('data/evilbase.png');
  goldcoin = loadImage('assets/goldcoin.png');
  soundFormats('ogg', 'mp3');
  maintheme = loadSound('data/maintheme.mp3');
  forest = loadSound('data/forest.mp3');
  desert = loadSound('data/desert.mp3');
  ice = loadSound('data/ice.mp3');
  lava = loadSound('data/lava.mp3');

  ONBUTTON = loadImage('assets/button-pushed.png');
  OFFBUTTON = loadImage('assets/button.png');
  COOLBUTTON = loadImage('assets/button-cooldown.png');

  forestbackground = loadImage('data/forestbackground.png');
  desertbackground = loadImage('data/desertbackground.png');
  icebackground = loadImage('data/icebackground.png');
  lavabackground = loadImage('data/lavabackground.png');
  
  
}

function draw() { 
  if (mode == 20) {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(width/20);
    background(bg);
    text('Click to Play', width/2, (height/2));
    textAlign(CORNER);
  } else if (mode == 0) {
    maintheme.setVolume(0.1);
    menu.render();
  } else if (mode == 1) {
    lvlselect.render();
  } else if (mode == 2 || mode == 3) {//In game Screen
    background(curbackgroundcolor);
    image(curbackground, 0, 0, width, 72*height/89);  
    myHUD.render();
    yourHUD.render();
    mathbar.render();
    myBase.render();
    yourBase.render();
    uButtons.render();
    dButtons.render();
    pause.renderPause();
    myBase.gold.render();

    uButtons.hovered();
    ai.onTimer();

    myBase.renderUnits();
    myBase.moveUnits();

    yourBase.renderUnits();
    yourBase.moveUnits();
    if (pause.pauseBut.clicked()) {
      pause.pauseBut.img = ONBUTTON;
    } else {  
      pause.pauseBut.img = OFFBUTTON;
    }
    if (myBase.health <= 0) {
      mode = 3;
      // gameOver();
      clear();
      background(bg);
      textSize(100);
      fill(255);
      text("GAME OVER\nClick to return to Menu.", width/2, height/2);
      fill(0);
    }

    if (yourBase.health <= 0) {
      mode = 3;
      // gameOver();
      clear();
      background(bg);
      textSize(100);
      fill(255);
      text("WIN\nClick to return to Menu.", width/2, height/2);
      fill(0);
    }
  } else if (mode == 4) {
    background(bg);
    lvlselect.backBut.render();
    lvlselect.backBut.renderText(15);
    fill(255);
    textSize(width/20);
    textAlign(CENTER, CENTER);
    text("Programmers:", width/2, (height*2/12));
    text("Art Design:", width/2, (height*5/12));
    text("Music Design:", width/2, (height*8/12));
    textSize(width/30);
    text("Jack Rogers, Nicholas Weiner, Cesar Camacho", width/2, (height*3.5/12));
    text("Mara Russell", width/2, height*6.5/12); 
    text("Chauncey Lo", width/2, height*9.5/12);
    textAlign(CORNER);
  } else if (mode == 10) {                          //Pause Menu
    switch(lvlselect.curLevel) {
    case 1:
      image(forestbackground, 0, 0, width, 72*height/89);
      break;
    case 2:
      image(desertbackground, 0, 0, width, 72*height/89);
      break;
    case 3:
      image(icebackground, 0, 0, width, 72*height/89);
      break;
    case 4:
      image(lavabackground, 0, 0, width, 72*height/89);
      break;
    }
    pause.gameState(myHUD, yourHUD, mathbar, myBase, yourBase, uButtons, dButtons); 
    pause.renderPause();
    pause.render();
    pause.pauseBut.img = ONBUTTON;
  } else if (mode == 11) {                          //Tutorial Menu
    curbackgroundcolor = "#874b0f";
    background(curbackgroundcolor);
    image(forestbackground, 0, 0, width, 72*height/89); 
    pause.gameState(myHUD, yourHUD, mathbar, myBase, yourBase, uButtons, dButtons);
    tutorial.render();
    myBase.gold.render();
    lvlselect.backBut.render();
    lvlselect.backBut.renderText(15);
  } else {
    background(255);
  }
}

function keyPressed() {
  background(255);
  let read = key;
  let input = read - 0;
  if (mode === 2) {
    if (input >= 0 && input <= 9) {
      mathbar.push(input);
    } else if (read === '-' && mathbar.isClear()) {
      mathbar.push(read);
    } else if (read === "Backspace") {
      lastchar = mathbar.pop();
    } else if (read === "Delete") {
      mathbar.clear();
    } else if (read === "Enter") {
      mathbar.check();
    }
  }
}



function mousePressed() {
  if (mode == 20) {
    mode = 0;
    maintheme.setVolume(0.1);
    maintheme.loop();
  } else if (mode == 0) {      //Main Menu Screen

    if (menu.playBut.clicked()) { 
      //menu.playBut.img = ONBUTTON;
      mode = 2;
      if (maintheme.isPlaying()) {
        maintheme.stop();
      }
      switch(lvlselect.curLevel) {
      case 1:
        forest.setVolume(0.1);
        forest.loop();
        curbackground = forestbackground;
        curbackgroundcolor = "#874b0f";
        break;
      case 2:
        desert.setVolume(0.1);
        desert.loop();
        curbackground = desertbackground;
        curbackgroundcolor = "#edc9af";
        break;
      case 3:
        ice.setVolume(0.1);
        ice.loop();
        curbackground = icebackground;
        curbackgroundcolor = "#d3eef2";
        break;
      case 4:
        lava.setVolume(0.1);
        lava.loop();

        curbackground = lavabackground;
        curbackgroundcolor = "#000000";
      }
    } else if (menu.lvlBut.clicked()) { 
      //menu.lvlBut.img = ONBUTTON;
      mode = 1;
    } else if (menu.tutBut.clicked()) { 
      //menu.tutBut.img = ONBUTTON;
      mode = 11;
    } else if (menu.credBut.clicked()) {
      mode = 4;
    }
  } else if (mode == 1) {                             //Level Select Button
    for (let i = 0; i < lvlselect.lvlsBut.length; i++) {
      if (lvlselect.lvlsBut[i].clicked()) {
        //lvlselect.lvlsBut[i].img = ONBUTTON;
        //mode = 3+i;
        console.log(i);
        lvlselect.swi(i);
        switch(i) {
          // level 1
        case 3:
          ai = new LevelOne(yourBase);
          lvlselect.curLevel = 1;
          break;
          // level 2
        case 2:
          ai = new LevelTwo(yourBase);
          lvlselect.curLevel = 2;
          break;
          // level 3
        case 1:
          ai = new LevelThree(yourBase);
          lvlselect.curLevel = 3;
          break;
          // level 4
        case 0:
          ai = new LevelFour(yourBase);
          lvlselect.curLevel = 4;
          break;
          // level 5
        }
      }
      if (lvlselect.backBut.clicked()) {
        mode = 0;
      }
    }
  } else if (mode ==2) {                               //In-game Screen
    if (pause.pauseBut.clicked()) {
      //pause.pauseBut.img = ONBUTTON;
      mode = 10;
    }
    uButtons.spawns();
    dButtons.problems();
  } else if (mode == 3) {                            //Win or lose
    setup();
    forest.stop();
    ice.stop();
    lava.stop();
    desert.stop();
    mode = 20;
  } else if (mode == 4) {
    if (lvlselect.backBut.clicked()) {
      mode = 0;
    }
  } else if (mode == 10) {                            //Pause Menu
    if (pause.resBut.clicked()) {
      mode = 2;
    } else  if (pause.menuBut.clicked()) {
      setup();
      forest.stop();
      ice.stop();
      lava.stop();
      desert.stop();
      mode = 20;
    }
  } else if (mode == 11) {                     //Tutorial mode
    tutorial.incrCount();
    if (lvlselect.backBut.clicked()) {
      //lvlselect.backBut.img = ONBUTTON;
      tutorial.exBase.units = [];
      tutorial.enemyBase.units = [];
      tutorial.counter = 0;
      mode = 0;
    }
  }
  redraw();
}


function windowResized() { 
  resizeCanvas(window.innerWidth, window.innerHeight);
}
