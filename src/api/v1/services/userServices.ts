import { PrismaClient } from '@prisma/client'

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