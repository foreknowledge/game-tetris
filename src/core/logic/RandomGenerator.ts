import { randomItem } from '../../utils/random';
import { Type } from '../type/tetromino.types';

/**
 * 다음 Tetromino 나오는 규칙 정의
 */
export default class RandomGenerator {
  private bag: Set<Type> = new Set(ALL_TYPES);

  next(): Type {
    if (this.bag.size === 0) this.bag = new Set(ALL_TYPES);

    const nextItem = randomItem([...this.bag]);
    this.bag.delete(nextItem);

    return nextItem;
  }
}

export const ALL_TYPES: readonly Type[] = ['Z', 'L', 'O', 'S', 'I', 'J', 'T'];
