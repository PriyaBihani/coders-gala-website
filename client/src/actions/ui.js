import store from '../store';

export const setOpenTopics = (id) => async (dispatch) => {
  console.log(id);
  const openTopicsArray = store.getState().ui.openTopics;
  if (!openTopicsArray.includes(id)) {
    openTopicsArray.push(id);
  } else {
    openTopicsArray.splice(openTopicsArray.indexOf(id), 1);
  }

  dispatch({
    type: 'SET_OPEN_TOPICS',
    payload: openTopicsArray,
  });
};
