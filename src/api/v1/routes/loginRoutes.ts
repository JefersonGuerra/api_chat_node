import { FastifyInstance } from 'fastify'
import { CreateLogin } from '../controllers/loginController'

export default async function loginRoutes(login: FastifyInstance) {

    login.route({
        method: 'POST',
        url: '/',
        handler: function (request, reply) {
            CreateLogin(request, reply);
        }
    });

}