const initialState = {
  openTopics: [],
  displayMode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")
    : "light",
};
console.log(localStorage.getItem("mode"));

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_OPEN_TOPICS":
      return {
        ...state,
        openTopics: payload,
      };
    case "SET_DISPLAY_MODE":
      return {
        ...state,
        displayMode: payload,
      };

    default:
      return state;
  }
}
