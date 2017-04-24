/* globals __DEV__ */
import Phaser from 'phaser'
import SelectBox from './../classes/select-box.js'
import Utils from './../classes/utils.js'

var movePosition = {
    x: 0,
    y: 0
}

export default class extends Phaser.State {
  init () {
    game.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };

    game.time.advancedTiming = true;
  }

  preload () {
    game.load.image('red', 'assets/sprites/red.png');
    game.load.image('blue', 'assets/sprites/blue.png');
  }

  create () {
    this.selectBox = new SelectBox();
    this.blueMoving = true;

    this.cursors = this.input.keyboard.createCursorKeys();
    game.input.mouse.capture = true;

    game.stage.backgroundColor = "#FFFFFF";

    this.graphics = game.add.graphics(0, 0);

    this.red = game.add.sprite(game.world.centerX + 200, game.world.centerY, 'red');
    this.red.pivot.x = this.red.width * .5;
    this.red.pivot.y = this.red.height * .5;

    this.blue = game.add.sprite(game.world.centerX - 200, game.world.centerY, 'blue');
    this.blue.pivot.x = this.blue.width * .5;
    this.blue.pivot.y = this.blue.height * .5;

    game.physics.arcade.enable([this.blue, this.red]);
    this.red.body.collideWorldBounds = true;
    this.blue.body.collideWorldBounds = true;

    this.red.body.bounce.set(0);
    this.red.body.setCircle(this.red.width / 2);
    this.red.body.moves = true;

    this.blue.body.bounce.set(0);
    this.blue.body.setCircle(this.blue.width / 2);
    this.blue.body.moves = true;
  }

  update () {
    this.selectBox.update();

    if (Utils.isRightMouseButtonDown()) {
      movePosition.x = game.input.mousePointer.x;
      movePosition.y = game.input.mousePointer.y;

      game.physics.arcade.moveToXY(this.blue, movePosition.x, movePosition.y, 300);
    }

    this.distance = game.physics.arcade.distanceToXY(this.blue, movePosition.x , movePosition.y);

    if (Math.abs(Math.round(this.distance)) <= 16) {
      this.blue.body.velocity.x = 0;
      this.blue.body.velocity.y = 0;
    }

    if (this.checkOverlap(this.red, this.blue) && this.blueMoving) {
      this.red.body.velocity.x = 0;
      this.red.body.velocity.y = 0;

      this.blue.body.velocity.x = 0;
      this.blue.body.velocity.y = 0;

      this.blueMoving = false;
    } else {
      this.blueMoving = true;
    }

    game.physics.arcade.collide(this.red, this.blue);
  }

  render () {
    this.graphics.kill();
    this.graphics = game.add.graphics(0, 0);
    this.selectBox.renderSelectBox(this.graphics);

    if (__DEV__) {
      game.debug.text(game.time.fps || '--', game.width - 30, 20, "#00ff00");
      game.debug.text("Position x: " + game.input.mousePointer.x, 10, 25);
      game.debug.text("Position y: " + game.input.mousePointer.y, 10, 55);
      this.selectBox.debug();

      game.debug.text("Distance: " + this.distance, 10, 205);

      game.debug.body(this.red);
      game.debug.body(this.blue);
    }
  }

  checkOverlap (spriteA, spriteB) {
    return Phaser.Circle.intersects(spriteA.body, spriteB.body);
  }

}
