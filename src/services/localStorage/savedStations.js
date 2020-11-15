const savedStationsStorageName = "smog-app-saved-stations";

const getSavedStations = () => {
  return JSON.parse(localStorage.getItem(savedStationsStorageName)) || [];
};

const addSavedStation = station => {
  const stations = getSavedStations();

  // Add station if not present
  if (!stations.find(currentStation => currentStation.stationId === station.stationId)) {
    stations.push(station);
    localStorage.setItem(savedStationsStorageName, JSON.stringify(stations));
  }
};

const removeSavedStation = station => {
  const oldStations = getSavedStations();
  const newStations = oldStations.filter(currentStation => currentStation.stationId !== station.stationId);
  return localStorage.setItem(savedStationsStorageName, JSON.stringify(newStations));
};

const isStationSaved = station => {
  const stations = getSavedStations();
  return Boolean(stations.find(currentStation => currentStation.stationId === station.stationId));
};

export { getSavedStations, addSavedStation, removeSavedStation, isStationSaved };
