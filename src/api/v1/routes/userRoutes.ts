import { FastifyInstance } from 'fastify'
import fastifystatic from '@fastify/static'
import { createUser } from '../controllers/userController'

import multer from 'fastify-multer'
import { uploadUser } from '../services/userServices'
import path from 'path'

export default async function userRoutes(user: FastifyInstance) {

    user.register(multer.contentParser)

    user.register(fastifystatic, {
        root: path.join(`${__dirname}/../storage/user`),
    })

    user.route({
        method: 'POST',
        url: '/',
        preHandler: uploadUser,
        handler: function (request, reply) {
            createUser(request, reply);
        }
    });

}