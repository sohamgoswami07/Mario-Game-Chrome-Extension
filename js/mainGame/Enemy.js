function Enemy() {
  let gameUI = GameUI.getInstance();

  let tickCounter = 0; //for animating enemy
  let maxTick = 10; //max number for ticks to show enemy sprite

  let element = new Image();
  element.src = 'images/enemies.png';

  this.x;
  this.y;
  this.velX = 1;
  this.velY = 0;
  this.grounded = false;
  this.type;
  this.state;

  this.sX;
  this.sY = 0;
  this.width = 32;
  this.height = 32;

  this.frame = 0;

  let that = this;

  this.goomba = function() {
    this.type = 20;
    that.sX = 0;
  };

  this.draw = function() {
    that.sX = that.width * that.frame;
    gameUI.draw(element, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
  };

  this.update = function() {
    let gravity = 0.2;

    if (that.grounded) {
      that.velY = 0;
    }

    if (that.state == 'dead') {
      that.frame = 2; //squashed goomba

      tickCounter++;
      if (tickCounter >= 60) {
        that.frame = 4;
      }
    } else if (that.state == 'deadFromBullet') {
      //falling goomba
      that.frame = 3;
      that.velY += gravity;
      that.y += that.velY;
    } else {
      //only animate when not dead
      that.velY += gravity;
      that.x += that.velX;
      that.y += that.velY;

      //for animating
      tickCounter += 1;

      if (tickCounter > maxTick) {
        tickCounter = 0;
        if (that.frame == 0) {
          that.frame = 1;
        } else {
          that.frame = 0;
        }
      }
    }
  };
}
