/* globals __DEV__ */
import Phaser from 'phaser'
import SelectBox from './../classes/select-box.js'
import Utils from './../classes/utils.js'
import UnitManager from './../classes/UnitManager.js'
import Unit from './../classes/Unit.js'


export default class extends Phaser.State {
  init () {
    game.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };

    game.time.advancedTiming = true;

    this.movePosition = {
      x: 0,
      y: 0
    };

    this.unitManager = new UnitManager(game);
    this.unitManager.add(new Unit('red', game.world.centerX + 200, game.world.centerY, false));
    this.unitManager.add(new Unit('blue', game.world.centerX - 200, game.world.centerY, true));
  }

  preload () {
    this.unitManager.preload();
  }

  create () {
    this.selectBox = new SelectBox();

    this.cursors = this.input.keyboard.createCursorKeys();
    game.input.mouse.capture = true;

    game.stage.backgroundColor = "#FFFFFF";

    this.graphics = game.add.graphics(0, 0);

    this.unitManager.create();
  }

  update () {
    this.selectBox.update();

    if (Utils.isRightMouseButtonDown()) {
      this.movePosition.x = game.input.mousePointer.x;
      this.movePosition.y = game.input.mousePointer.y;

      for (let unit of this.unitManager.getPlayerUnits) {
        game.physics.arcade.moveToXY(unit.sprite, this.movePosition.x, this.movePosition.y, 300);
      }
    }

    for (let unit of this.unitManager.getPlayerUnits) {
      unit.distance = game.physics.arcade.distanceToXY(unit.sprite, this.movePosition.x, this.movePosition.y);

      if (Math.abs(Math.round(unit.distance)) <= 16) {
        unit.sprite.body.velocity.x = 0;
        unit.sprite.body.velocity.y = 0;
      }
    }

    game.physics.arcade.collide(this.unitManager.sprites);
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

      for (let unit of this.unitManager.getUnits) {
        game.debug.body(unit.sprite);
      }
    }
  }
}
