const colors = {
  red: '#d64e12',
  orange: '#f9a52c',
  yellow: '#efdf48',
  green: '#8bd346',
  lightblue: '#60dbe8',
  blue: '#167bd8',
  purple: '#9b5fe0',
};

const numToColorMap: Map<number, string> = new Map([
  [1, colors.red],
  [2, colors.orange],
  [3, colors.yellow],
  [4, colors.green],
  [5, colors.lightblue],
  [6, colors.blue],
  [7, colors.purple],
]);

export function getColorFor(num: number): string {
  return numToColorMap.get(num) ?? colors.red;
}
