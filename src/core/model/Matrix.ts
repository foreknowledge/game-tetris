export default class Matrix {
  #data: number[][];

  width: number;
  height: number;

  constructor(data: number[][]) {
    this.#data = data;
    this.height = data.length;
    this.width = this.height > 0 ? data[0].length : 0;
  }

  get(x: number, y: number) {
    return this.#data[y][x];
  }

  set(x: number, y: number, val: number) {
    this.#data[y][x] = val;
  }

  getLine(y: number) {
    return this.#data[y];
  }

  setLine(y: number, line: number[]) {
    this.#data[y] = line;
  }

  rotateRight(times: number = 1) {
    this.#rotate(times);
  }

  rotateLeft(times: number = 1) {
    this.#rotate(4 - (times % 4));
  }

  #rotate(times: number) {
    const w = times % 2 ? this.width : this.height;
    const h = times % 2 ? this.height : this.width;
    const newData = Array.from(Array(h), () => Array(w).fill(0));

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        switch (times % 4) {
          case 0:
            newData[y][x] = this.#data[y][x];
          case 1:
            newData[y][x] = this.#data[h - 1 - x][y];
            break;
          case 2:
            newData[y][x] = this.#data[h - 1 - y][w - 1 - x];
            break;
          case 3:
            newData[y][x] = this.#data[x][w - 1 - y];
            break;
        }
      }
    }
    this.width = w;
    this.height = h;
    this.#data = newData;
  }

  forEach(callback: (x: number, y: number, val: number) => void) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        callback(x, y, this.#data[y][x]);
      }
    }
  }

  duplicate() {
    return new Matrix(this.#data.map((col) => col.slice()));
  }

  print() {
    console.log(
      this.#data
        .map((col) => col.map((i) => (i === 0 ? '.' : i)).join(' '))
        .join('\n')
    );
  }
}
