import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function getMessagesService(params: any) {

    const user_sender = parseInt(params.id_user_sender);
    const user_received = parseInt(params.id_user_received);

    const messages = await prisma.message.findMany({
        where: {
            OR: [{
                AND: [{ id_user_sender: user_sender }, { id_user_recipient: user_received }]
            },
            {
                AND: [{ id_user_sender: user_received }, { id_user_recipient: user_sender }]
            }]
        },
        select: {
            id: true,
            id_user_sender: true,
            id_user_recipient: true,
            text: true,
            createdAt: true
        }
    });

    return messages;
}

export { getMessagesService }
