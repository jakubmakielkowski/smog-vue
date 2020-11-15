const languageStorageName = "smog-app-lanugage";

const getLanguage = () => {
  return localStorage.getItem(languageStorageName);
};

const setLanguage = language => {
  return localStorage.setItem(languageStorageName, language);
};

export { getLanguage, setLanguage };
