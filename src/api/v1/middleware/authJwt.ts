import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";

export default function authJwt(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {

    let token = `${request.headers['authorization']?.split(' ')[1]}`;

    jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }, function (err, decoded) {

        if (err) return reply.code(401).send({ data: { error: err.message } });
        if (decoded) return done();
        return reply.code(500).send({ data: { error: "Erro de conexão" } });

    });
}
