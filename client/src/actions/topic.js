import { serviceGet, servicePost } from '../helpers/api';

export const getTopics = (specialityName) => async (dispatch) => {
  try {
    const res = await serviceGet(`api/topic/get/${specialityName}`);
    dispatch({
      type: 'GET_TOPICS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_TOPICS_ERROR',
      payload: {},
    });
  }
};

export const addTopic = (data, specialityName) => async (dispatch) => {
  console.log(specialityName);
  try {
    const res = await servicePost(`api/topic/add`, data, {
      'Content-Type': 'application/json',
    });
    console.log(res.data);
    dispatch({
      type: 'ADD_TOPIC',
      payload: res.data,
    });
    // refresh topics
    const res2 = await serviceGet(`api/topic/get/${specialityName}`);
    dispatch({
      type: 'GET_TOPICS',
      payload: res2.data,
    });
  } catch (error) {
    dispatch({
      type: 'ADD_TOPIC_ERROR',
      payload: {},
    });
  }
};

export const editTopic = (data, id, specialityName) => async (dispatch) => {
  try {
    const res = await servicePost(`api/topic/update/${id}`, data, {
      'Content-Type': 'application/json',
    });
    console.log(res.data);
    dispatch({
      type: 'EDIT_TOPIC',
      payload: res.data,
    });
    const res2 = await serviceGet(`api/topic/get/${specialityName}`);
    dispatch({
      type: 'GET_TOPICS',
      payload: res2.data,
    });
  } catch (error) {
    dispatch({
      type: 'EDIT_TOPIC_ERROR',
      payload: {},
    });
  }
};

export const deleteTopic = (id, specialityName) => async (dispatch) => {
  console.log({ id, specialityName });
  try {
    const res = await servicePost(
      `api/topic/delete/${id}`,
      {},
      {
        'Content-Type': 'application/json',
      }
    );
    console.log(res.data);
    dispatch({
      type: 'DELETE_TOPIC',
      payload: res.data,
    });
    const res2 = await serviceGet(`api/topic/get/${specialityName}`);
    dispatch({
      type: 'GET_TOPICS',
      payload: res2.data,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_TOPIC_ERROR',
      payload: {},
    });
  }
};
