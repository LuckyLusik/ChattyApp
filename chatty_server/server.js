const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const messageDatabase = [];
const colorArray = ['#E37222', '#07889B', '#A0015B', '#007849'];
let colorNumber = 0;
let peopleNumber = 0;


wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  peopleNumber = wss.clients.size;

  if(colorNumber > 3) {
    colorNumber = 0;
  }

  console.log('color: ', colorArray[colorNumber], "colorNumber: ", colorNumber);

  ws.on('message', data => {
    console.log(`Got message from the client ${data}`);
    const objData = JSON.parse(data);
    console.log(`User ${objData.username} said ${objData.content}`);

    switch (objData.type) {
      case 'postMessage':
        const objectToBroadcast = {
          id: uuid(),
          username: objData.username,
          content: objData.content,
          type: 'incomingMessage',
          color: objData.color
        };
        messageDatabase.push(objectToBroadcast);
        wss.broadcastJSON(objectToBroadcast);
        break;
      case 'postNotification':
        const nameToBroadcast = {
          id: uuid(),
          content: objData.content,
          type: 'incomingNotification'
        };
        messageDatabase.push(nameToBroadcast);
        wss.broadcastJSON(nameToBroadcast);
        break;
      default:
    }

  });

  const initialMessage = {
    type: 'initialMessages',
    messages: messageDatabase,
    colorName: colorArray[colorNumber]
  };
  ws.send(JSON.stringify(initialMessage));

  colorNumber = colorNumber + 1;

  const userConnected = {
    type: 'userConnected',
    people: peopleNumber
  }
  wss.broadcastJSON(userConnected);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const userDisconnected = {
    type: 'userDisconnected',
    people: peopleNumber - 1
  }
  wss.broadcastJSON(userDisconnected);
  });
});