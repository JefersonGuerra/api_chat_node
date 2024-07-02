import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function getUserService(params: any, fullUrl: string) {

    const email = params.email
    const id_user_sender = parseInt(params.id_user_sender)

    if (!email) return null

    const user = await prisma.user.findMany({
        where: {
            email: {
                contains: email,
            },
        },
        select: {
            id: true,
            public_id: true,
            name: true,
            image: true,
            add_contact_sender: {
                where: {
                    OR: [{ id_user_sender: id_user_sender }, { id_user_recipient: id_user_sender }]
                }
            },
            add_contact_recipient: {
                where: {
                    OR: [{ id_user_sender: id_user_sender }, { id_user_recipient: id_user_sender }]
                }
            }
        }
    });

    user.map((item) => item.image = `${fullUrl}/${item.image}`)

    return user;
}

async function createContactRequestService(data: any) {
    const add_contact = await prisma.add_contact.create({
        data: data
    })

    return add_contact;
}

export { getUserService, createContactRequestService }
