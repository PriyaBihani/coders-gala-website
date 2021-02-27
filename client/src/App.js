import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import Loadable from "react-loadable";

import { setAuthToken } from "./helpers";
import { loadUser } from "./actions/auth";

import "bootstrap/dist/js/bootstrap.js";

import store from "./store";
import Loader from "./layout/Preloader";
import Navbar from "./layout/Navbar/Navbar";
import Article from "./components/Article";
import UpsertCard from "./components/UpsertCard";
import UpsertArticle from "./components/UpsertArticle";

const SignUp = Loadable({
  loader: () => import("./components/SignUp"),
  loading: () => <Loader />,
});
const SignIn = Loadable({
  loader: () => import("./components/SignIn"),
  loading: () => <Loader />,
});

const Preview = Loadable({
  loader: () => import("./components/Preview"),
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
          <Route exact path="/learn/:specialityName" component={Preview} />
          <Route
            render={(props) => <UpsertArticle {...props} edit={false} />}
            exact
            path="/article/add/:topicId"
          />
          <Route
            render={(props) => <UpsertArticle {...props} edit={true} />}
            exact
            path="/article/update/:articleId"
          />
          <Route exact path="/:specialityId/:topicId/:id" component={Article} />
          <Route
            render={(props) => <UpsertCard {...props} edit={false} />}
            exact
            path="/AddCard"
          />
          <Route
            render={(props) => <UpsertCard {...props} edit={true} />}
            exact
            path="/updatespeciality/:specialityName"
          />
        </Switch>
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default App;
