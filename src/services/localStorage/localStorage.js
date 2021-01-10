const languageStorageName = "smog-app-language";
const modalStorageName = "smog-app-modal";
const positionStorageName = "smog-app-position";
const sourceStorageName = "smog-app-source";

const getLocalStorageData = storageName => {
  return JSON.parse(localStorage.getItem(storageName));
};

const setLocalStorageData = (storageName, source) => {
  return localStorage.setItem(storageName, JSON.stringify(source));
};

export {
  languageStorageName,
  modalStorageName,
  positionStorageName,
  sourceStorageName,
  getLocalStorageData,
  setLocalStorageData
};
