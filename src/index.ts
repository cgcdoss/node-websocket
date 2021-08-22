import express from 'express';
import http from 'http';
import ws from 'ws';
// import WebSocket, { WebSocketServer } from 'ws';

// const app = express();
// const httpServer = http.createServer(app);
const server = new ws.Server({
  port: 3333
});

let sockets: any[] = [];
let messages: any[] = [];

server.on('connection', (socket) => {
  console.log('Um novo cliente conectou');
  socket.send('Bem vindo ao socket');

  if (messages.length) {
    socket.send(JSON.stringify(messages));
  }

  // Adiciona cada nova conexão/socket ao array `sockets`
  sockets.push(socket);

  // Quando receber uma mensagem, envia ela para todos os sockets
  socket.on('message', (msg) => {
    console.log('Mensagem recebida:' + msg);
    messages.push(JSON.parse(msg.toString()));
    sockets.forEach(s => s.send(msg.toString()));
  });

  // Quando a conexão de um socket é fechada/desconectada, remove o socket do array
  socket.on('close', () => {
    console.log('Um cliente se desconectou');
    sockets = sockets.filter(s => s !== socket);
  });
});

// httpServer.listen(3333);


// cliente nodejs
/* const app2 = express();
app2.get('/t', async (req, res) => {
  let client = new ws('ws://localhost:3333');
  await new Promise(resolve => client.once('open', () => {
    client.send(req.query.msg);
    resolve('');
  }));
  await new Promise(resolve => client.on('message', (msg: any) => {
    console.log('Msg no Cliente: ' + msg);
    resolve(msg);
    res.json(msg.toString());
  }));

  // Esperamos o cliente conectar com o servidor usando async/await

  // res.json('ok');
});

app2.listen(3334);
 */
