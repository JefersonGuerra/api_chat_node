import { FastifyRequest, FastifyReply } from "fastify";

function getUser(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ hello: 'world' });
}

function createUser(request: FastifyRequest, reply: FastifyReply) {
   
    const data = request.body;

    reply.send({ data });
}

export { getUser, createUser }