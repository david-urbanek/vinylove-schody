export const saveToSession = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const getFromSession = (key: string) => {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};
