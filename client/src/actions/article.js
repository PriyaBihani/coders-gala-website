import { serviceGet, servicePost } from '../helpers';
import { errorToast, successToast } from './toast';
export const clearArticle = (id) => async (dispatch) => {
  dispatch({
    type: 'CLEAR_ARTICLE',
  });
};

export const getArticle = (id) => async (dispatch) => {
  try {
    const res = await serviceGet(`api/article/get/${id}`);
    console.log(res.data);
    successToast(res)
    dispatch({
      type: 'GET_ARTICLE',
      payload: res.data,
    });
  } catch (error) {
    errorToast(error)
    dispatch({
      type: 'GET_ARTICLE_ERROR',
      payload: {},
    });
  }
};

export const getAllArticles = () => async (dispatch) => {
  try {
    const res = await serviceGet(`api/article/all`);
    console.log(res.status)
    successToast(res)
    dispatch({
      type: 'GET_ALL_ARTICLES',
      payload: res.data,
    });
  } catch (error) {
    errorToast(error)
    dispatch({
      type: 'GET_ALL_ARTICLES_ERROR',
      payload: {},
    });
  }
};

export const addArticle = (data) => async (dispatch) => {
  try {
    console.log(data)
    const res = await servicePost(`api/article/add`, data, {
      'Content-Type': 'application/json',
    });
    console.log(res.data);
    dispatch({
      type: 'ADD_ARTICLE',
      payload: res.data,
    });
    successToast(res)
    // const res2 = await serviceGet(`api/topic/get/${specialityName}`);
    // console.log(res2.data);

    // dispatch({
    //   type: 'GET_TOPICS',
    //   payload: res2.data,
    // });
  } catch (error) {
    errorToast(error)
    dispatch({
      type: 'ADD_ARTICLE_ERROR',
      payload: {},
    });
  }
};

export const editArticle = (data, id, specialityName) => async (dispatch) => {
  try {
    const res = await servicePost(`api/article/update/${id}`, data, {
      'Content-Type': 'application/json',
    });
    console.log(res.data);
    dispatch({
      type: 'EDIT_ARTICLE',
      payload: res.data,
    });
    const res2 = await serviceGet(`api/topic/get/${specialityName}`);
    console.log(res2.data);

    successToast(res)

    dispatch({
      type: 'GET_TOPICS',
      payload: res2.data,
    });
  } catch (error) {
    errorToast(error)
    dispatch({
      type: 'EDIT_ARTICLE_ERROR',
      payload: {},
    });
  }
};

export const deleteArticle = (articleId, topicId, specialityName) => async (
  dispatch
) => {
  try {
    const res = await servicePost(
      `api/article/delete/${articleId}/${topicId}`,
      {},
      {
        'Content-Type': 'application/json',
      }
    );
    console.log(res.data);
    dispatch({
      type: 'DELETE_ARTICLE',
      payload: res.data,
    });
    const res2 = await serviceGet(`api/topic/get/${specialityName}`);
    console.log(res2.data);

    successToast(res)

    dispatch({
      type: 'GET_TOPICS',
      payload: res2.data,
    });
  } catch (error) {
    errorToast(error)
    dispatch({
      type: 'DELETE_ARTICLE_ERROR',
      payload: {},
    });
  }
};
