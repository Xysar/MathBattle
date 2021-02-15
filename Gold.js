function Gold() {
  this.total = 0;
  let time = millis();
  this.img = goldcoin;


  this.incrGold = function(num = 1) {
    //if (millis()>time) {
      this.total += num;
      //time = millis()+1000;
    //}
  };

  this.decrGold = function(decr) {
    this.total -= decr;
  };

  this.render = function(coin) {
    rectMode(CENTER, CENTER);
    textAlign(CENTER, CENTER);
    textSize(width/40);
    fill(255);
    //rect(width*3/20, (height*7/32), width/24, height/12);
    fill(0);
    if(lvlselect.curLevel == 4){
      fill(255);
    }
    text(this.total, width*3/20, height/6 + width/40);
    imageMode(CENTER);
    image(this.img, width*7/40, height/6 + width/40, width/40, width/40);
    imageMode(CORNER);
    rectMode(CORNER);
  };
}
