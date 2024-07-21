import { FastifyInstance } from 'fastify'
import { getMessages } from '../controllers/listMessagesController'
import authJwt from '../middleware/authJwt'

export default async function listMessagesRoute(listMessagesRoute: FastifyInstance) {

    listMessagesRoute.route({
        method: 'GET',
        url: '/',
        preHandler: function (request, reply, done) {
            authJwt(request, reply, done);
        },
        handler: function (request, reply) {
            getMessages(request, reply);
        },
    });

}