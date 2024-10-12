import ws from 'ws';
import dotenv from 'dotenv';
import Note from '../model/note.model.js';
import { Sequelize } from 'sequelize';

dotenv.config();


// Creating a connection to the WebSocket server
const WebSocket = new ws(process.env.WEBSOCKET_URL);

// Opening the client-side connection
WebSocket.on('open', () => {
    console.log('WebSocket connection opened.');
  });

  
// Messages sent by the client
WebSocket.on('message', async (message) => {
    try {
      const messageWS = JSON.parse(message);

      // Switch to interact with the database based on client actions
    switch (messageWS.action) {
        case 'start':
    }
}