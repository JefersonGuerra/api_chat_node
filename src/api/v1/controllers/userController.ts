import { FastifyRequest, FastifyReply } from "fastify";
import { createUserService } from "../services/userServices";
import createUserValidation from "../validations/userValidation"
import fs from "fs"

async function createUser(request: FastifyRequest, reply: FastifyReply) {

    const data: any = request.body;
    const file: any = request.file;

    if (file?.size > 0) {
        data.image = file?.filename;
    }

    await createUserValidation(data).then(function (validData) {
        const user = createUserService(validData, file);

        user.then(function (result) {
            reply.code(201).send({
                success: "Usuário criado com sucesso!",
                data: result
            });
        }).catch(function (error) {
            if (file?.path) {
                fs.unlinkSync(file.path);
            }
            reply.code(500).send(error);
        })

    }).catch(function (error) {
        if (file?.path) {
            fs.unlinkSync(file.path);
        }
        reply.code(error.status).send({ errorValidations: error });
    })

}

export { createUser }