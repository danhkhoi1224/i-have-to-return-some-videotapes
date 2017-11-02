import path from 'path';
import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config';

const compiler = webpack(config);

const appleData = 
{
  "applinks": {
    "apps": [],
    "details": [
    {
      "appID": "898EDDGZNP.vn.com.vng.zalopay.sb1",
      "paths": ["*"]
    }
    ]
  }
};

express()
  .use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  .use(webpackHotMiddleware(compiler))
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  //.use('/apple-app-site-association', express.static(path.join('apple-app-site-association')))
  //.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
  .use('/apple-app-site-association', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(appleData));
  })
  .listen(process.env.PORT || 3000);            