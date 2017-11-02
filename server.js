import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config';

const compiler = webpack(config);


express()
  .use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  .use(webpackHotMiddleware(compiler))
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/apple-app-site-association', express.static(path.join('apple-app-site-association')))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
  .listen(process.env.PORT || 3000);            