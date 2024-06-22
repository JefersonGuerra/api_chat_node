import { FastifyRequest, FastifyReply } from "fastify";
import { getUserService, createUserService } from "../services/userServices";
import createUserValidation from "../validations/userValidation"
import fs from "fs"

function getUser(request: FastifyRequest, reply: FastifyReply) {

    const public_id = request.query;

    const user = getUserService(public_id);

    user.then(function (result) {
        reply.code(200).send({ data: result });
    }).catch(function (error) {
        reply.code(500).send(error);
    })

}

async function createUser(request: any, reply: FastifyReply) {

    const data = request.body;
    const file = request.file;

    await createUserValidation(data).then(function (validData) {
        const user = createUserService(validData, file);

        user.then(function (result) {
            reply.code(201).send({ data: result });
        }).catch(function (error) {
            reply.code(500).send(error);
        })

    }).catch(function (error) {
        fs.unlinkSync(file.path);
        reply.code(error.status).send({ data: { error: error.messages } });
    })

}

export { getUser, createUser }