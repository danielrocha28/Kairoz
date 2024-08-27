const WebSocket = require('ws');


wss.on('connection', (ws) => {
    console.log('Cliente conectado ao WS');

    Nota.findAll().then((notas) => {
        ws.send(JSON.stringify({ action: 'loadNotas', notas }));
    });

    ws.on('message', async (message) => {
        const parseMsg = JSON.parse(message);

        switch (parseMsg.action) {
            case 'createNota':
                const novaNota = await Nota.create({
                    titulo: parseMsg.titulo,
                    conteudo: parseMsg.conteudo,
                });
            
                ws.send(JSON.stringify({ action: 'notacreated', nota: novaNota }));
            
                break;

            case 'updateNota':
                const [updated] = await Nota.update({ conteudo: parseMsg.conteudo }, {
                    where: { id: parseMsg.id }
                });

                if (updated) {
                    const updatedNota = await Nota.findByPk(parseMsg.id);

                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ action: 'notaUpdated', nota: updatedNota }));
                        }
                    });
                }
                break;

            case 'deleteNota':
                const deleted = await Nota.destroy({ where: { id: parseMsg.id } });

                if (deleted) {
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ action: 'notaDeleted', id: parseMsg.id }));
                        }
                    });
                }
                break;

            default: {
                console.log('Ação inválida:', parseMsg.action);
            }
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});