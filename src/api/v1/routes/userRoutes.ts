import { FastifyInstance } from 'fastify'
import fastifystatic from '@fastify/static'
import { getUser, createUser } from '../controllers/userController'
import authJwt from '../middleware/authJwt'
import multer from 'fastify-multer'
import { uploadUser } from '../services/userServices'
import path from 'path'

export default async function userRoutes(user: FastifyInstance) {

    user.register(multer.contentParser)

    user.register(fastifystatic, {
        root: path.join(`${__dirname}/../storage/user`),
    })

    user.route({
        method: 'GET',
        url: '/',
        preHandler: function (request, reply, done) {
            authJwt(request, reply, done);
        },
        handler: function (request, reply) {
            getUser(request, reply);
        },
    });

    user.route({
        method: 'POST',
        url: '/',
        preHandler: [
            function (request, reply, done) {
                authJwt(request, reply, done);
            },
            uploadUser,
        ],
        handler: function (request, reply) {
            createUser(request, reply);
        }
    });

}