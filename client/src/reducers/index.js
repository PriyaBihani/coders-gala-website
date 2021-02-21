import { combineReducers } from 'redux';
import auth from './auth';
import speciality from './speciality';
import topic from './topic';
import article from './article';
import ui from './ui';
// import alert from "./alert";
// import category from "./category";
// import brand from "./brand";
// import product from "./product";
// import products from "./products";
// import user from "./user";
// import pincode from "./pincode";
// import cart from "./cart";
// import order from "./order";
// import payment from "./payment";
// import carousel from "./carousel";

export default combineReducers({
  auth,
  speciality,
  topic,
  article,
  ui,
  // alert,
  // category,
  // brand,
  // product,
  // user,
  // products,
  // pincode,
  // cart,
  // order,
  // payment,
  // carousel,
});
