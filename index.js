const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
const addWebsocketSupport = require('express-ws');

const app = express();
const httpsServer = https.createServer({ key: fs.readFileSync('./key.pem'), cert: fs.readFileSync('./cert.pem') }, app);
addWebsocketSupport(app, httpsServer);

let socket;
app.use(express.static(path.join(__dirname, 'client/build')));

app.get(['/generic-page', '/scroll-listener'], (req, res) => res.sendFile(path.join(__dirname+'/client/build/index.html')));

app.post('/user-scrolls/:slot', (req, res) => {
  console.log('User scrolled to', req.params.slot);
  if (socket) socket.send(req.params.slot);
  res.sendStatus(201);
});

app.ws('/user-scrolls/listen', (_socket) => {
  socket = _socket;
  console.log('WebSocket was opened');

  socket.on('close', () => {
    console.log('WebSocket was closed');
    socket = null;
  });

  socket.on('error', err => console.log('Websocket error:', err))
});

const port = process.env.PORT || 5000;
httpsServer.listen(port, () => console.log('App is listening on port', port));
