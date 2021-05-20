import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import Loadable from 'react-loadable';

import { setAuthToken } from './helpers';
import { loadUser } from './actions/auth';

import 'bootstrap/dist/js/bootstrap.js';

import store from './store';
import { Preloader as Loader } from './layout/preloader';
import Navbar from './layout/Navbar/Navbar';
import Article from './components/Article';
import UpsertCard from './components/UpsertCard';
import UpsertArticle from './components/UpsertArticle';
import Auth from './components/Auth';
import UpsertTopic from './components/UpsertTopic';
import UpsertVideo from './components/UpsertVideo';
import Blog from './components/Blog';
// import PrivateRoute from './helpers/PrivateRoute';

const Preview = Loadable({
	loader: () => import('./components/Preview'),
	loading: () => <Loader />,
});

const Home = Loadable({
	loader: () => import('./components/Home'),
	loading: () => <Loader />,
});
const About = Loadable({
	loader: () => import('./components/About'),
	loading: () => <Loader />,
});
const Learn = Loadable({
	loader: () => import('./components/Learn'),
	loading: () => <Loader />,
});

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<div className='App'>
			<Navbar />
			<AnimatePresence>
				<Switch>
					<Redirect exact from='/' to='home' />;
					<Route exact path='/home' component={Home} />
					<Route exact path='/about' component={About} />
					<Route exact path='/learn' component={Learn} />
					<Route
						render={(props) => <Auth {...props} type={'signup'} />}
						exact
						path='/signup'
					/>
					<Route
						render={(props) => <UpsertTopic edit={false} {...props} />}
						exact
						path='/:specialityName/topic/add'
					/>
					<Route
						render={(props) => <UpsertTopic edit={true} {...props} />}
						exact
						path='/:specialityName/topic/edit/:topicId'
					/>
					<Route
						render={(props) => <Auth {...props} type={'signup'} />}
						exact
						path='/signup/:referCode'
					/>
					<Route
						render={(props) => <Auth {...props} type={'login'} />}
						exact
						path='/login'
					/>
					<Route exact path='/learn/:specialityName' component={Preview} />
					<Route
						render={(props) => <UpsertArticle {...props} edit={false} />}
						exact
						path='/article/add'
					/>
					<Route
						render={(props) => <UpsertArticle {...props} edit={true} />}
						exact
						path='/article/update'
					/>
					<Route
						render={(props) => <UpsertVideo {...props} edit={false} />}
						exact
						path='/video/add/:topicId'
					/>
					<Route
						render={(props) => <UpsertVideo {...props} edit={true} />}
						exact
						path='/video/update/:videoId'
					/>
					<Route exact path='/blog/read/:name' component={Article} />
					<Route
						render={(props) => <UpsertCard {...props} edit={false} />}
						exact
						path='/AddCard'
					/>
					<Route
						render={(props) => <UpsertCard {...props} edit={true} />}
						exact
						path='/updatespeciality/:specialityName'
					/>

					<Route exact path='/blog' component={Blog} />
				</Switch>
			</AnimatePresence>
			<ToastContainer />
		</div>
	);
};

export default App;
