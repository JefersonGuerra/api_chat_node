import { FastifyInstance } from 'fastify'
import { CreateLogin } from '../controllers/loginController'
import multipart from '@fastify/multipart'

export default async function loginRoutes(login: FastifyInstance) {

    login.register(multipart, { attachFieldsToBody: 'keyValues' })

    login.route({
        method: 'POST',
        url: '/',
        handler: function (request, reply) {
            CreateLogin(request, reply);
        }
    });

}