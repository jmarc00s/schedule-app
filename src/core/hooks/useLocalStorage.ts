const useLocalStorage = (key: string) => {
  function setItem(value: any) {
    localStorage.setItem(key, value);
  }

  function getItem(): any {
    try {
      const value = localStorage.getItem(key);
      return value && JSON.parse(value);
    } catch {
      return null;
    }
  }

  return { setItem, getItem };
};

export default useLocalStorage;
