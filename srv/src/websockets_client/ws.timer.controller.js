import ws from 'ws';
import dotenv from 'dotenv';
import Timer from '../model/timer.model.js';
import { Sequelize } from 'sequelize';
import logger from '../config/logger.js'; 

dotenv.config();

// Creating a connection to the WebSocket server
const WebSocket = new ws(process.env.WEBSOCKET_URL);

// Opening the client-side connection
WebSocket.on('open', () => {
  logger.info('WebSocket connection opened.');
});

// Messages sent by the client
WebSocket.on('message', async (message) => {
  try {
    const messageWS = JSON.parse(message);

    // Switch to interact with the database based on client actions
    switch (messageWS.action) {
      case 'start':
        try {
          await Timer.update(
            { start_time: messageWS.function,
              day_update: messageWS.day},
            { where: { id_time: messageWS.id } }
          );
        } catch (error) {
          logger.error('Error starting the timer:', error);
        }
        break;

      case 'pause':
        try {
          await Timer.update(
            { status_time: 'Paused',
              day_update: messageWS.day,
              end_time: messageWS.function, 
              total_time: Sequelize.literal('CASE WHEN (end_time - start_time) < 0 THEN - (end_time - start_time) ELSE (end_time - start_time) END')},
            { where: { id_time: messageWS.id } });
        } catch (error) {
          logger.error('Error pausing the timer:', error);
        }
        break;

      case 'resume':
        try {
          await Timer.update(
            { status_time: 'Resumed',
              day_update: messageWS.day,
              start_time: Sequelize.literal(`${messageWS.function} + total_time`)},
            { where: { id_time: messageWS.id } }
          );
        } catch (error) {
          logger.error('Error resuming the timer:', error);
        }
        break;

      default:
        WebSocket.send(JSON.stringify({ error: 'Action not recognized' }));
    }
  } catch (error) {
    logger.error('Error processing the message:', error);
    WebSocket.send(JSON.stringify({ error: 'Error processing the action.' }));
  }
});

// Exporting the WebSocket instance to interact with the client
export default WebSocket;