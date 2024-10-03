import ws from 'ws';
import dotenv from 'dotenv';
import Timer from '../model/timer.model.js';
import { Sequelize } from 'sequelize';

dotenv.config();

// Creating a connection with the WebSocket server
const WebSocket = new ws(process.env.WEBSOCKET_URL);

// Opening client-side server
WebSocket.on('open', () => {
  console.log('WebSocket connection opened.');
});

// Messages sent by the client
WebSocket.on('message', async (message) => {
  const messageWS = JSON.parse(message); 
  try {
  
    // switch that interacts with the database based on client actions
    switch (messageWS.action) {
      case 'start':
        try {
          await Timer.update(
            { start_time: messageWS.function },
            { where: { id_time: messageWS.id } }
          );
        } catch (error) {
          console.error('Error starting the timer:', error);
        }
        break;

      case 'pause':
        try {
          await Timer.update(
            {status_time: 'Paused',
              end_time: messageWS.function, // Corrected to use the proper field
              total_time: Sequelize.literal(`CASE WHEN (end_time - start_time) < 0 
                THEN - (end_time - start_time) ELSE (end_time - start_time) END`)},
            { where: { id_time: messageWS.id } }
          );
          
        } catch (error) {
          console.error('Error pausing the timer:', error);
        }
        break;

      case 'resume':
        try {
          await Timer.update({ status_time: 'Resumed',
              start_time: Sequelize.literal(`${messageWS.function} + total_time `)},
              { where: { id_time: messageWS.id }});

        } catch (error) {
          console.error('Error resuming the timer:', error);
        }
        break;
      default:
        WebSocket.send(JSON.stringify({ error: 'Action not recognized' }));
    }
  } catch (error) {
    console.error('Error processing the message:', error);
    WebSocket.send(JSON.stringify({ error: 'Error processing the action.' }));
  }
});
// Exporting the WebSocket instance to interact with the client
export default WebSocket;

