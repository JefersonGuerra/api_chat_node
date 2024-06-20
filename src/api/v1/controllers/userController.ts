import { FastifyRequest, FastifyReply } from "fastify";
import { getUserService, createUserService } from "../services/userServices";
import createUserValidation from "../validations/userValidation"

function getUser(request: FastifyRequest, reply: FastifyReply) {

    const public_id = request.query;

    const user = getUserService(public_id);

    user.then(function (result) {
        reply.code(200).send({ data: result });
    }).catch(function (error) {
        reply.code(500).send(error);
    })

}

async function createUser(request: FastifyRequest, reply: FastifyReply) {

    const data = request.body;

    
    await createUserValidation(data).then(function (validData) {
        
        const user = createUserService(validData);

        user.then(function (result) {
            reply.code(201).send({ data: result });
        }).catch(function (error) {
            reply.code(500).send(error);
        })
        
    }).catch(function (error) {
        reply.code(error.status).send({ data: { error: error.messages } });
    })

}

export { getUser, createUser }