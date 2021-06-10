import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';
import store from './clientStore';

import './index.css';

console.log('working prehydreate');

loadableReady(() => {
    ReactDOM.hydrate(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
});
