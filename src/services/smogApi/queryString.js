import apiStore from "@/store/api";

const buildStationsQueryString = () => {
  const state = apiStore.state;

  const queryString = {};

  for (const param in state) {
    if (state[param]) {
      queryString[param] = state[param];
    }
  }

  const params = new URLSearchParams(queryString);

  return params;
};

export { buildStationsQueryString };
