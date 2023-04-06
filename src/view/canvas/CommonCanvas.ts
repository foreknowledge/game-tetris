export default class CommonCanvas {
  _isAnimating = false;

  constructor() {
    this._isAnimating = true;
  }

  startAnimation() {
    this._isAnimating = true;
    this.animate();
  }

  stopAnimation() {
    this._isAnimating = false;
  }

  animate() {}
}
