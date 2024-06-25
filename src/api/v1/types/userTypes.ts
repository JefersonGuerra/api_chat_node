import { FastifyRequest } from "fastify";
export interface userTypes extends FastifyRequest {
    name?: string;
    password?: string;
    email?: string;
    image?: string;
    file?: {
        fieldname: string,
        originalname: string,
        encoding: string,
        mimetype: string,
        destination: string,
        filename: string,
        path: string,
        size: number
    }
}