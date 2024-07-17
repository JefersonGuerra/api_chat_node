import { FastifyInstance } from 'fastify'
import { getUser } from '../controllers/listContactController'
import authJwt from '../middleware/authJwt'
import fastifystatic from '@fastify/static'
import path from 'path'

export default async function listContactRoute(listContactRoute: FastifyInstance) {

    listContactRoute.register(fastifystatic, {
        root: path.join(`${__dirname}/../storage/user`),
    })

    listContactRoute.route({
        method: 'GET',
        url: '/',
        preHandler: function (request, reply, done) {
            authJwt(request, reply, done);
        },
        handler: function (request, reply) {
            getUser(request, reply);
        },
    });

}