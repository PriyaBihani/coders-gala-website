const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_ARTICLE':
      return {
        ...state,
        topics: payload,
      };

    case 'GET_ARTICLE':
      return {
        ...state,
        selectedArticle: payload.article,
      };
    case 'CLEAR_ARTICLE':
      return {
        ...state,
        selectedArticle: {},
      };

    case 'ADD_ARTICLE_ERROR':
      return {
        ...state,
      };

    default:
      return state;
  }
}
