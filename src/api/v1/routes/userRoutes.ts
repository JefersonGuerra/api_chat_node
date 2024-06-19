import { FastifyInstance } from 'fastify'
import { getUser, createUser } from '../controllers/userController'
import authJwt from '../middleware/authJwt';

export default async function userRoutes(user: FastifyInstance) {

    user.route({
        method: 'GET',
        url: '/',
        preHandler: function (request, reply, next) {
            authJwt(request, reply, next);
        },
        handler: function (request, reply) {
            getUser(request, reply);
        },
    });

    user.route({
        method: 'POST',
        url: '/',
        handler: function (request, reply) {
            createUser(request, reply);
        }
    });

}