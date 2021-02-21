const initialState = {
  openTopics: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case 'SET_OPEN_TOPICS':
      return {
        ...state,
        openTopics: payload,
      };

    default:
      return state;
  }
}
