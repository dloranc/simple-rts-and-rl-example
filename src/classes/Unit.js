export default class Unit {
  constructor (name, params = {}) {
    const defaultParams = {
      life: 100,
      x: 400,
      y: 400,
      speed: 300,
      isPlayer: false
    };

    this.name = name;
    this.position = {};
    this.position.x = params.x || defaultParams.x;
    this.position.y = params.y || defaultParams.y;
    this.speed = params.speed || defaultParams.speed;
    this.isPlayer = params.isPlayer || defaultParams.isPlayer;
  }

  get getName () {
    return this.name;
  }

  set setName (value) {
    this.name = value;
  }
}
