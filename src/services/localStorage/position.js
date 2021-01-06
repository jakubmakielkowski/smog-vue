const positionStorageName = "smog-app-position";

const getPosition = () => {
  return JSON.parse(localStorage.getItem(positionStorageName));
};

const setPosition = position => {
  return localStorage.setItem(positionStorageName, JSON.stringify(position));
};

export { getPosition, setPosition };
