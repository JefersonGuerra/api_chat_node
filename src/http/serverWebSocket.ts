const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', async (socket: any) => {
    const sender = socket.handshake.auth.sender;
    const received = socket.handshake.auth.received;

    const arrayIds = [sender, received];
    arrayIds.sort(function (a, b) {
        return a - b;
    });

    const room = `${arrayIds}`;
    socket.join(room);

    socket.on('sendMessage', (data: any) => {
        io.to(room).emit("receivedMessage", data);
    });
})

httpServer.listen(5000, () => {
    console.log("Server listening on port 5000");
});