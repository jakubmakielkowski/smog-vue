const getColorByLevel = level => {
  switch (level) {
    case "Bardzo dobry":
      return "#66bb6a";
    case "Dobry":
      return "#9ccc65";
    case "Umiarkowany":
      return "#d4e157";
    case "Dostateczny":
      return "#ffee58";
    case "Zły":
      return "#ffca28";
    case "Bardzo zły":
      return "#ffa726";
    default:
      return "#6c7493";
  }
};

export { getColorByLevel };
