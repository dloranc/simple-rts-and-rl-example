export default class Unit {
  constructor (name, x = 0, y = 0, isPlayer) {
    this.name = name;
    this.position = {};
    this.position.x = x;
    this.position.y = y;
    this.isPlayer = isPlayer;
  }

  get getName () {
    return this.name;
  }

  set setName (value) {
    this.name = value;
  }
}
