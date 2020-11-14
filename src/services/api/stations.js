import axios from "axios";

const getStations = async () => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_SMOG_API_URL}/stations/gios`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { getStations };
