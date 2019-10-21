const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, './client/index.html');

const server = express()
    .use(express.static('client'))
    .use((req, res) => res.sendFile(INDEX) )
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    ws.on('message', data => {
        sendData(data);
    });;
});

function sendData(data) {
    wss.clients.forEach(ws => ws.send(data));
}
