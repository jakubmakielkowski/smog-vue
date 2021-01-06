import store from "@/store/store";

const success = position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  store.dispatch("map/setPosition", { lat, lon });
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
