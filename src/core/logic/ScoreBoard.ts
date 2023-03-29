export type ScoreState = {
  level: number;
  score: number;
  lines: number;
};

/**
 * 게임 점수판
 */
export default class ScoreBoard {
  private level: number = 1;
  private totalScore: number = 0;
  private totalLines: number = 0;

  get state(): ScoreState {
    return {
      level: this.level,
      score: this.totalScore,
      lines: this.totalLines,
    };
  }

  onStateChanged = (_: ScoreState) => {};

  reset() {
    this.level = 1;
    this.totalScore = 0;
    this.totalLines = 0;
  }

  clearLines(lines: number) {
    this.totalLines += lines;
    this.totalScore += this.getScore(lines) * this.level;

    if (this.totalLines >= this.level * 10) {
      this.level++;
    }

    this.onStateChanged(this.state);
  }

  softDrop() {
    this.totalScore += 1;
    this.onStateChanged(this.state);
  }

  hardDrop(cells: number) {
    this.totalScore += cells * 2;
    this.onStateChanged(this.state);
  }

  private getScore(lines: number): number {
    if (lines === 1) return 100;
    if (lines === 2) return 300;
    if (lines === 3) return 500;
    if (lines === 4) return 800;

    return 0;
  }
}
