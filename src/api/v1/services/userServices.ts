import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import path from 'path'
import multer from 'fastify-multer'
import { v4 as uuidv4 } from 'uuid';
import { userTypes } from "../types/userTypes";

const prisma = new PrismaClient();

const upload = multer({

    storage: multer.diskStorage({
        destination: path.join(`${__dirname}/../storage/user`),
        filename(req, file, callback) {
            const fileName = `${uuidv4()}_${file.originalname}`

            return callback(null, fileName)
        },
    }),

})

const uploadUser = upload.single('image')

async function createUserService(data: any, file: userTypes["file"]) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password ?? '', salt);

    Object.keys(data).forEach(() => {
        data['password'] = hash;
        data['image'] = file?.filename;
    });

    delete data.re_password;

    const user = await prisma.user.create({
        data: data,
        select: {
            name: true,
            email: true,
            image: true,
        }
    })

    return user;
}

export { createUserService, uploadUser }
