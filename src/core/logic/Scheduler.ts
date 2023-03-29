export default class Scheduler {
  private speed: number;
  private timerId?: number;
  private callback = () => {};

  constructor(speed: number) {
    this.speed = speed;
  }

  start(callback: () => void) {
    if (this.timerId) return;

    this.callback = callback;
    this.timerId = setInterval(() => this.callback(), this.speed);
  }

  pause() {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  changeSpeed(speed: number) {
    if (this.speed === speed) return;

    clearInterval(this.timerId);

    this.speed = speed;
    this.timerId = setInterval(() => this.callback(), this.speed);
  }
}
