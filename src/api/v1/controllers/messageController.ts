import { messagService } from "../services/messageServices";
import { WebSocket } from "ws";

async function CreateMessage(socket: WebSocket, req: any, fastify: any) {

    const username = req.query?.user;
    console.log('Client connected');

    socket.on('message', message => {
        message = JSON.parse(message.toString());
        // console.log(message);
        broadcast({
            sender: username,
            ...message
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    function broadcast(message: any) {
        for (let client of fastify.websocketServer.clients) {
            // console.log(client)
            // client.send(JSON.stringify(message));
        }
    }

}

export { CreateMessage }