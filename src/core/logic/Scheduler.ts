export default class Scheduler {
  private speed: number;
  private timerId?: number;
  private task?: () => void;

  constructor(speed: number) {
    this.speed = speed;
  }

  start(task: () => void) {
    clearInterval(this.timerId);

    this.task = task;
    this.timerId = setInterval(() => task(), this.speed);
  }

  stop() {
    this.pause();
    this.task = undefined;
  }

  pause() {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  resume() {
    const task = this.task;
    if (!task) {
      throw new Error(
        'No scheduler is running. Please start the scheduler first.'
      );
    }

    if (this.timerId) return;
    this.timerId = setInterval(() => task(), this.speed);
  }

  changeSpeed(speed: number) {
    const task = this.task;
    if (!task) {
      throw new Error(
        'No scheduler is running. Please start the scheduler first.'
      );
    }

    if (this.speed === speed) return;
    clearInterval(this.timerId);

    this.speed = speed;
    this.timerId = setInterval(() => task(), this.speed);
  }
}
