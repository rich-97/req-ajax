'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');

const server = http.createServer();
const port = process.env.PORT || 8080;

const html = fs.readFileSync(path.join(__dirname, 'index.html'));

let items = ['ajax', 'request', 'server'];

server.listen(port, onListen);
server.on('request', onRequest);

function onRequest (req, res) {
  let reqUrl = url.parse(req.url);

  if (reqUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();
  } else if (reqUrl.pathname === '/data') {
    res.writeHead(200);
    res.write(items.toString().replace(/,/g, ' '));
    res.end();
  } else if (reqUrl.pathname === '/post') {
    req.on('data', function (chunk) {
      let data = chunk.toString();
      items.push(data);
      res.writeHead(201);
      res.end();
    });
  } else if (reqUrl.pathname === '/delete') {
    let query = qs.parse(reqUrl.query);
    let index = parseInt(query.index);

    if (index >= 1) {
      items.splice(index, index);
    } else {
      items.shift();
    }

    res.writeHead(200);
    res.end();
  } else if (reqUrl.pathname === '/test.json') {
    let json = fs.readFileSync(path.join(__dirname, 'test.json'));
    res.writeHead(200);
    res.write(json.toString());
    res.end();
  } else if (reqUrl.pathname === '/json') {
    req.on('data', function (chunk) {
      let json = chunk.toString();
      console.log(json);
    });
    res.writeHead(200);
    res.end();
  } else if (reqUrl.pathname === '/test.js') {
    let js = fs.readFileSync(path.join(__dirname, 'test.js'));
    res.write(js);
    res.end();
  } else if (reqUrl.pathname === '/ajax.js') {
    let ajax = fs.readFileSync(path.resolve(__dirname, '../dist/ajax.js'));
    res.write(ajax);
    res.end();
  }
}

function onListen () {
  console.log('The server test is running.');
  console.log(`Please open your browser at http://localhost:${port}.`);
}
