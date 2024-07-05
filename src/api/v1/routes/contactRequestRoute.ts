import { FastifyInstance } from 'fastify'
import { getUser, createContactRequest, aceptInvite, refuseInvite } from '../controllers/contactRequestController'
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
        preHandler: function (request, reply, done) {
            authJwt(request, reply, done);
        },
        handler: function (request, reply) {
            createContactRequest(request, reply);
        }
    });

    contactRequestRoute.route({
        method: 'PUT',
        url: '/aceptInvite',
        preHandler: function (request, reply, done) {
            authJwt(request, reply, done);
        },
        handler: function (request, reply) {
            aceptInvite(request, reply);
        }
    });

    contactRequestRoute.route({
        method: 'DELETE',
        url: '/refuseInvite',
        preHandler: function (request, reply, done) {
            authJwt(request, reply, done);
        },
        handler: function (request, reply) {
            refuseInvite(request, reply);
        }
    });

}