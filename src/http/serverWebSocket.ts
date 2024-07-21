const { createServer } = require('http');
const { Server } = require('socket.io');
import socketJwt from '../api/v1/middleware/socketJwt';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const port = process.env.PORT_SOCKET ?? 5000;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

function time() {
    function pad(s: any) {
        return (s < 10) ? '0' + s : s;
    }
    var date = new Date();
    return [date.getHours(), date.getMinutes()].map(pad).join(':');
}

io.on('connection', async (socket: any) => {

    io.use((socket: any, next: any) => {
        const status: any = socketJwt(socket.handshake.auth.token);
        if (status === 200) {
            next();
        } else {
            next(new Error("invalid"));
        }
    });

    socket.join(socket.handshake.auth.room);

    socket.on('sendMessage', async (data: any) => {
        data.createdAt = time();
        io.to(socket.handshake.auth.room).emit("receivedMessage", data);
        if (data.id_user_sender && data.id_user_recipient) {
            await prisma.message.create({
                data: {
                    text: data.text,
                    id_user_sender: data.id_user_sender,
                    id_user_recipient: data.id_user_recipient,
                }
            })
        }
    });
})

httpServer.listen(port, () => {
    console.log(`Server web socket listening on port ${port}`);
});