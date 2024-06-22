import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import path from 'path'
import multer from 'fastify-multer'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function getUserService(params: any) {

    let user;
    const public_id = params.id

    if (public_id) {
        user = await prisma.user.findFirst({
            where: {
                public_id: public_id,
            },
            select: {
                name: true,
                email: true,
                image: true,
            }
        });
    } else {
        user = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                image: true,
            }
        });
    }


    return user;
}

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

async function createUserService(data: any, file: any) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    Object.keys(data).forEach(() => {
        data['password'] = hash;
        data['image'] = file.filename;
    });

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

export { getUserService, createUserService, uploadUser }
