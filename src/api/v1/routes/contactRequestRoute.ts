import { FastifyInstance } from 'fastify'
import { getUser, createContactRequest } from '../controllers/contactRequestController'
import authJwt from '../middleware/authJwt'
import fastifystatic from '@fastify/static'
import path from 'path'

export default async function contactRequestRoute(contactRequestRoute: FastifyInstance) {

    contactRequestRoute.register(fastifystatic, {
        root: path.join(`${__dirname}/../storage/user`),
    })

    contactRequestRoute.route({
        method: 'GET',
        url: '/',
        preHandler: function (request, reply, done) {
            authJwt(request, reply, done);
        },
        handler: function (request, reply) {
            getUser(request, reply);
        },
    });

    contactRequestRoute.route({
        method: 'POST',
        url: '/',
        handler: function (request, reply) {
            createContactRequest(request, reply);
        }
    });

}