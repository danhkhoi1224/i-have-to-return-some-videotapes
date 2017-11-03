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

const androidData = 
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "vn.com.vng.zalopay.sb1",
    "sha256_cert_fingerprints":
    ["DA:5F:CA:C0:45:C8:9B:60:E8:05:21:A2:74:F2:EC:8A:27:0B:CF:E2:1C:9E:1F:0C:76:4D:B1:66:3D:6D:6C:E1"]
  }
}];

express()
  .use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  .use(webpackHotMiddleware(compiler))
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/apple-app-site-association', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(appleData));
  })
  .use('/.well-known/assetlinks.json',function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(androidData));
  })
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
  .listen(process.env.PORT || 3000);            