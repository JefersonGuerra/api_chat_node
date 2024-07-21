import { FastifyReply, FastifyRequest } from "fastify";
import { getMessagesService } from '../services/listMessagesServices'

function getMessages(request: FastifyRequest, reply: FastifyReply) {

    const data = request.query;

    const messages = getMessagesService(data);

    messages.then(function (result) {
        reply.code(200).send(result);
    }).catch(function (error) {
        reply.code(500).send(error);
    })

}

export { getMessages }