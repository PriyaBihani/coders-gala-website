const initialState = {
  specialities: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_SPECIALITIES':
      return {
        ...state,
        specialities: payload,
      };
    case 'GET_SPECIALITY':
      return {
        ...state,
        speciality: payload,
      };
    case 'CLEAR_SPECIALITY':
      return {
        ...state,
        speciality: {},
      };
    case 'GET_SPECIALITIES_ERROR':
      return {
        ...state,
      };

    case 'GET_SPECIALITY_ERROR':
      return {
        ...state,
      };

    default:
      return state;
  }
}
