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

// To store all messages which were sent from server
const messageDatabase = [];

// Colors for user's name
const colorArray = ['#E37222', '#07889B', '#A0015B', '#007849'];
let colorNumber = 0;

// To store people online
let peopleNumber = 0;


wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

// Send data to all clients who are connected
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

  // Number of people online
  peopleNumber = wss.clients.size;

  // Check what color to choose
  if(colorNumber > 3) {
    colorNumber = 0;
  }

  // When client sends a message to server
  ws.on('message', data => {
    console.log('Got message from the client');
    const objData = JSON.parse(data);
    console.log(`User ${objData.username} said ${objData.content}`);

    // Check what type of message received
    switch (objData.type) {
      // Someone posted a message
      case 'postMessage':
        // Creating object with unique id
        const objectToBroadcast = {
          id: uuid(),
          username: objData.username,
          content: objData.content,
          type: 'incomingMessage',
          color: objData.color
        };
        // Adding this object to array of messages
        messageDatabase.push(objectToBroadcast);
        // Sending object to all connected users
        wss.broadcastJSON(objectToBroadcast);
        break;
      // Someone has changed his name
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

  // Creating object with initial info
  const initialMessage = {
    type: 'initialMessages',
    messages: messageDatabase,
    colorName: colorArray[colorNumber]
  };
  ws.send(JSON.stringify(initialMessage));
  // Changing color of user's name to next one
  colorNumber = colorNumber + 1;
  // When someone new connected -
  // sending number of people online
  const userConnected = {
    type: 'userConnected',
    people: peopleNumber
  }
  wss.broadcastJSON(userConnected);

  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const userDisconnected = {
    type: 'userDisconnected',
    people: peopleNumber - 1
  }
  wss.broadcastJSON(userDisconnected);
  });
});