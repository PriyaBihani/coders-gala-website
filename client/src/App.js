import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import store from "./store";
import { setAuthToken } from "./helpers/setAuthToken";
import { loadUser } from "./actions/auth";

import Loader from "./layout/Preloader";

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/js/bootstrap.js";

import Navbar from "./layout/Navbar/Navbar";
import Article from "./components/Article";
import AddCard from "./components/AddCard";
import AddArticle from "./components/AddArticle";

const SignUp = Loadable({
  loader: () => import("./components/SignUp"),
  loading: () => <Loader />,
});
const SignIn = Loadable({
  loader: () => import("./components/SignIn"),
  loading: () => <Loader />,
});

const PreviewPage = Loadable({
  loader: () => import("./components/PreviewPage"),
  loading: () => <Loader />,
});

const Home = Loadable({
  loader: () => import("./components/Home"),
  loading: () => <Loader />,
});
const About = Loadable({
  loader: () => import("./components/About"),
  loading: () => <Loader />,
});
const Learn = Loadable({
  loader: () => import("./components/Learn"),
  loading: () => <Loader />,
});

if (localStorage.token) {
  console.log("-------->>>>>>>");
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence>
        <Switch>
          <Redirect exact from="/" to="home" />;
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/learn" component={Learn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup/:referCode" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/learn/:specialityName" component={PreviewPage} />
          <Route exact path="/:specialityId/:topicId/:Id" component={Article} />
          <Route
            render={(props) => <AddArticle {...props} edit={false} />}
            exact
            path="/article/add/:topicId"
          />
          <Route
            render={(props) => <AddArticle {...props} edit={true} />}
            exact
            path="/article/update/:articleId"
          />
          <Route
            render={(props) => <AddCard {...props} edit={false} />}
            exact
            path="/AddCard"
          />
          <Route
            render={(props) => <AddCard {...props} edit={true} />}
            exact
            path="/updatespeciality/:specialityName"
          />
          {/* <Route
            exact
            path="/updatespeciality/:specialityName"
            component={EditSpeciality}
          /> */}
        </Switch>
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default App;
