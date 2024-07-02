import { FastifyReply, FastifyRequest } from "fastify";
import { getUserService, createContactRequestService } from '../services/contactRequestServices'

function getUser(request: FastifyRequest, reply: FastifyReply) {

    const email = request.query;

    const fullUrl = `${request.protocol}://${request.hostname}${request.routeOptions.url}`

    const user = getUserService(email, fullUrl);

    user.then(function (result) {
        reply.code(200).send(result);
    }).catch(function (error) {
        reply.code(500).send(error);
    })

}

async function createContactRequest(request: FastifyRequest, reply: FastifyReply) {

    const data = request.body;

    const add_contact = createContactRequestService(data);

    add_contact.then(function (result) {
        reply.code(201).send(result);
    }).catch(function (error) {
        reply.code(500).send(error);
    })
}

export { getUser, createContactRequest }