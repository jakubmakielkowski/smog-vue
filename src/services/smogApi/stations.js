import axios from "axios";

const getStations = async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_SMOG_API_URL}/stations`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getStation = async stationId => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_SMOG_API_URL}/stations/${stationId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getStationMeasurement = async stationId => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_SMOG_API_URL}/stations/${stationId}/measurements`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getStationQualityIndex = async stationId => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_SMOG_API_URL}/stations/${stationId}/qualityIndex`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// TODO make API distinguish no results and error
const searchStations = async name => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_SMOG_API_URL}/stations?search=${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getStations, getStation, getStationMeasurement, getStationQualityIndex, searchStations };
