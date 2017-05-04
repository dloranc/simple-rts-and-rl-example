import Unit from './Unit.js'

export default class UnitManager {
  constructor (game) {
    this.units = [];
    this.sprites = game.add.group();
  }

  add (unit) {
    if (unit instanceof Unit) {
      this.units.push(unit);
    }
  }

  preload () {
    for (let unit of this.units) {
      game.load.image(unit.getName, 'assets/sprites/' + unit.getName + '.png');
    }

    game.load.image('healthbar', 'assets/sprites/health_bar.png');
  }

  create () {
    for (let unit of this.units) {
      let sprite = this.sprites.create(unit.position.x, unit.position.y, unit.getName);
      sprite.pivot.x = sprite.width * .5;
      sprite.pivot.y = sprite.height * .5;

      unit.sprite = sprite;

      let healthBar = game.make.sprite(0, -10, 'healthbar');
      healthBar.width = sprite.width;
      unit.sprite.addChild(healthBar);

      unit.healthBar = healthBar;
    }

    game.physics.arcade.enable(this.sprites);

    this.sprites.setAll('body.collideWorldBounds', true);
    this.sprites.setAll('body.bounce.x', 0);
    this.sprites.setAll('body.bounce.y', 0);
    this.sprites.setAll('body.minBounceVelocity', 0);

    for (let unit of this.units) {
      unit.sprite.body.setCircle(unit.sprite.width / 2);
    }
  }

  get getUnits () {
    return this.units;
  }

  get getPlayerUnits () {
    let units = [];

    for (let unit of this.units) {
      if (unit.isPlayer) {
        units.push(unit);
      }
    }

    return units;
  }

  get getSprites () {
    let sprites = [];

    for (let unit of this.units) {
      sprites.push(unit.sprite);
    }

    return sprites;
  }

  updateHealthBars () {
    for (let unit of this.units) {
      const lifePercentage = unit.life / unit.maxLife;
      unit.healthBar.width = unit.sprite.width * lifePercentage;
    }
  }
}
