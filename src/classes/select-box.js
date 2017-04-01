import Utils from './../classes/utils.js'

export default class SelectBox {
  constructor () {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.isDown = false;
  }

  update () {
    if (Utils.isLeftMouseButtonDown()) {
      if (this.isDown) {
        this.x2 = game.input.mousePointer.x - this.x1;
        this.y2 = game.input.mousePointer.y - this.y1;
      } else {
        this.x1 = game.input.mousePointer.x;
        this.y1 = game.input.mousePointer.y;
        this.isDown = true;
      }
    } else {
      this.x1 = 0;
      this.y1 = 0;
      this.x2 = 0;
      this.y2 = 0;
      this.isDown = false;
    }
  }

  renderSelectBox (graphics) {
    graphics.lineStyle(2, 0x00FF00, 1);
    graphics.beginFill(0x00FF00, .1);
    if (this.isDown) {
      graphics.drawRect(this.x1, this.y1, this.x2, this.y2);
    }
    graphics.endFill();
  }

  debug () {
    game.debug.text("Position x1: " + this.x1, 10, 85);
    game.debug.text("Position y1: " + this.y1, 10, 115);
    game.debug.text("Position x2: " + this.x2, 10, 145);
    game.debug.text("Position y2: " + this.y2, 10, 175);
  }
}