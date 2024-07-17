import { FastifyReply, FastifyRequest } from "fastify";
import { getUserService } from '../services/listContactServices'

function getUser(request: FastifyRequest, reply: FastifyReply) {

    const data = request.query;

    const fullUrl = `${request.protocol}://${request.hostname}${request.routeOptions.url}`

    const user = getUserService(data, fullUrl);

    user.then(function (result) {
        reply.code(200).send(result);
    }).catch(function (error) {
        reply.code(500).send(error);
    })

}

export { getUser }