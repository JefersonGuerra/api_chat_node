import { FastifyInstance } from 'fastify'
import { getUser, createUser } from '../controllers/userController'

export default async function userRoutes(user: FastifyInstance) {
    await user.route({
        method: 'GET',
        url: '/',
        handler: function (request, reply) {
            getUser(request, reply);
        }
    });

    await user.route({
        method: 'POST',
        url: '/',
        handler: function (request, reply) {
            createUser(request, reply);
        }
    });
}