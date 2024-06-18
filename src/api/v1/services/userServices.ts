import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

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

async function createUserService(data: any) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    Object.keys(data).forEach(() => {
        data['password'] = hash;
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

export { getUserService, createUserService }