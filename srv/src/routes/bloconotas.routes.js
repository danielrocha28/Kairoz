const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/bd');
const WebSocket = require('ws');

const app = express();
const PORT = 2000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync({ alter: true }).then(() => {
    console.log('Modelos sincronizados com o banco de dados.');

    const server = app.listen(PORT, () => {
        console.log(`Servidor rodando na porta: ${PORT}`);
    });

    const wss = new WebSocket.Server({ server })});