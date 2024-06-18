import { FastifyRequest, FastifyReply } from "fastify";
import { getUserService, createUserService } from "../services/userServices";

function getUser(request: FastifyRequest, reply: FastifyReply) {

    const public_id = request.query;

    const user = getUserService(public_id);

    user.then(function (result) {
        reply.code(200).send({ data: result });
    }).catch(function (error) {
        reply.code(500).send(error);
    })

}

function createUser(request: FastifyRequest, reply: FastifyReply) {

    const data = request.body;

    const user = createUserService(data);

    user.then(function (result) {
        reply.code(201).send({ data: result });
    }).catch(function (error) {
        reply.code(500).send(error);
    })

}

export { getUser, createUser }