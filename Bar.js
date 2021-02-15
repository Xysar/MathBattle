function Bar(leftside, val) {
  this.leftside = leftside;
  this.val = val;
  
  this.render = function() {
    const XSIZE = 5/6 * width/3;
    const YSIZE = height/10;
    let x = this.leftside? width/36 : 2 * width/3 + width/36;
    let y = height/27;
    
    fill(255);
    rect(x, y, XSIZE, YSIZE);
    fill(255, 0, 0);
    rect(x, y, XSIZE/100 * this.val, YSIZE);
    fill(0);
    textSize(16);
    text("hp", x + XSIZE/2, y + YSIZE/2);
  };

  this.getVal = function() {
    return this.val;
  };

  this.setVal = function(num) {
    this.val = num;
  };
}

// Both HBar and XPBar inherit Bar

function HBar(leftside, val) {
  Bar.call(this, leftside, val);
}

function XPBar(leftside, val) {
  Bar.call(this, leftside, val);
}
