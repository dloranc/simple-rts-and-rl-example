export default class Utils {
  static isLeftMouseButtonDown () {
    return game.input.mousePointer.leftButton.isDown;
  }

  static isRightMouseButtonDown () {
    return game.input.mousePointer.rightButton.isDown;
  }
}