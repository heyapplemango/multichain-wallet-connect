type LocalStorageKey = "AUTO_CONNECT_KEPLR" | "AUTO_CONNECT_METAMASK";
export const getLocalStorageValue = (key: LocalStorageKey) => {
  if (typeof window !== `undefined`) {
    const rawItem = window.localStorage.getItem(key);
    if (rawItem) {
      try {
        const item = JSON.parse(rawItem);
        return item;
      } catch {
        console.error(`Problem parsing localStorage item at key: `, key);
      }
    }
  }
};
export const setLocalStorageValue = (key: LocalStorageKey, value: boolean) => {
  try {
    if (typeof window !== `undefined`) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
};
