import { Type } from '../../core/type/tetromino.types';

const colors = {
  red: '#d64e12',
  orange: '#f9a52c',
  yellow: '#efdf48',
  green: '#8bd346',
  lightblue: '#60dbe8',
  blue: '#167bd8',
  purple: '#9b5fe0',
};

const typeToColorMap: Map<Type, string> = new Map([
  ['Z', colors.red],
  ['L', colors.orange],
  ['O', colors.yellow],
  ['S', colors.green],
  ['I', colors.lightblue],
  ['J', colors.blue],
  ['T', colors.purple],
]);

export function getColorFor(type: Type): string {
  return typeToColorMap.get(type) ?? colors.red;
}
