import mapStore from "@/store/map";

const success = position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  mapStore.dispatch("setPosition", { lat, lon });
};

const error = () => {
  console.log("Unable to retrieve your location");
};

const localize = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

export { localize };
