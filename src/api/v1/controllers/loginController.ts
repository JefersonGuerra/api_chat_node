import { FastifyRequest, FastifyReply } from "fastify";
import { loginService } from "../services/loginServices";
import createLoginValidation from "../validations/createLoginValidation"

async function CreateLogin(request: FastifyRequest, reply: FastifyReply) {

    const data = request.body;

    await createLoginValidation(data).then(function (validData) {

        const login = loginService(validData);

        login.then(function (result) {
            if (!result) return reply.code(401).send({ data: { error: "Email ou senha incorretos" } }); 

            return reply.code(200).send({ data: result });

        }).catch(function (error) {
            reply.code(500).send(error);
        })

    }).catch(function (error) {
        reply.code(error.status).send({ data: { error: error.messages } });
    })


}

export { CreateLogin }