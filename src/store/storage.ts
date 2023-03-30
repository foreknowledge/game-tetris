export function saveData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key: string): any | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
