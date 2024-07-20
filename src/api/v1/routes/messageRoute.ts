'use strict'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { CreateMessage } from '../controllers/messageController'
import websocket from '@fastify/websocket'

const connections: any = [];

export default async function messageRoute(message: FastifyInstance) {

    message.register(websocket)

    message.register(async function () {
        message.route({
            method: 'GET',
            url: '/:user?',
            handler: (req, reply) => {
            },
            wsHandler: (socket, req: any) => {
                const clientId = req.query.user;
                if (clientId) {
                    if (!connections[clientId]) {
                        connections[clientId] = [];
                    }
                    connections[clientId].push(socket);
                }

                sendToClient('889', 'Mensagem específica para cliente 123');

                // CreateMessage(socket, req, message);
            }
        })
    })

    function sendToClient(clientId: any, message: any) {
        // const clientSocket = connections.map((socket: any) => socket[`${clientId}`]);
        console.log(connections['889'])
        connections['889'].on('message', (dd: any) => {
            connections.send(JSON.stringify(dd));
        })
        // if (clientSocket) {
        // } else {
        //     console.log(`Cliente ${clientId} não encontrado ou não está conectado.`);
        // }
    }
}