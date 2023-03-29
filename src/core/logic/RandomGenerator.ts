import { randomItem } from '../../utils/random';
import { Type } from '../type/tetromino.types';

/**
 * 다음 Tetromino 나오는 규칙 정의
 */
export default class RandomGenerator {
  private bag = ALL_TYPES;

  next(): Type {
    if (this.bag.length === 0) this.bag = ALL_TYPES;

    const draw = randomItem(this.bag);
    this.bag = this.bag.filter((it) => it !== draw);

    return draw;
  }
}

export const ALL_TYPES: readonly Type[] = ['Z', 'L', 'O', 'S', 'I', 'J', 'T'];
