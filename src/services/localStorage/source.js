const sourceStorageName = "smog-app-source";

const getSource = () => {
  return localStorage.getItem(sourceStorageName);
};

const setSource = source => {
  return localStorage.setItem(sourceStorageName, source);
};

export { getSource, setSource };
