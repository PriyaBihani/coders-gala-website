import React from 'react';
import express from 'express';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';

import App from './src/App';
import routes from './src/Routes';
import createStore from './src/store';

const PORT = process.env.PORT || 3000;

var index = fs.readFileSync('build/index.html').toString();


const app = express();
const dev = process.env.NODE_ENV === 'development';

app.use(express.static('build'));

app.use(async (req, res) => {
    let activeRoute;
    const store = createStore();
    const statsFile = path.resolve('./build/loadable-stats.json');
    console.log("statsFile", statsFile)

    routes.map((route) => {
        const match = matchPath(req.url, { ...route, exact: true, url: req.url });
        if (match) {
            activeRoute = { ...route, params: match.params };
        }
    });

    console.log('ad', activeRoute);

    const promise = activeRoute?.loadData
        ? activeRoute.loadData(store, activeRoute.params)
        : Promise.resolve();

    promise.then((data) => {
        const reactMarkup = (
            <React.StrictMode>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={{}}>
                        <App />
                    </StaticRouter>
                </Provider>
            </React.StrictMode>
        );
        const extractor = new ChunkExtractor({ statsFile, publicPath: '/' });
        const html = renderToString(extractor.collectChunks(reactMarkup));
        const helmet = Helmet.renderStatic();
        let finalHtml = index
            .replace(
                '<!-- Helmet -->',
                `${helmet.title.toString()}
                 ${helmet.meta.toString()}
                 ${helmet.link.toString()}`
            )
            .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
            .replace(
                '//script',
                `window._INITIAL_DATA_ = ${serialize(store.getState()).replace(
                    /</g,
                    '\\u003c'
                )}`
            )
            .replace('<!-- loadable -->', extractor.getScriptTags());
        // console.log('working', finalHtml);
        res.send(finalHtml);
        res.end();
    });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
