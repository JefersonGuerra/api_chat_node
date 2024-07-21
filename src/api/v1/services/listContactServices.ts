import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function getUserService(params: any, fullUrl: string) {

    const id_user = parseInt(params.id_user)

    if (!id_user) return null

    const user = await prisma.add_contact.findMany({
        where: {
            status: true,
            OR: [{ id_user_sender: id_user }, { id_user_recipient: id_user }]
        },
        select: {
            id: true,
            id_user_sender: true,
            id_user_recipient: true,
            room: true,
            user_sender: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            user_recipient: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            }
        }
    });

    const userSend: any = user.filter(item => item.user_sender.id !== id_user).map(item => item.user_sender);
    const userRecipient: any = user.filter(item => item.user_recipient.id !== id_user).map(item => item.user_recipient);
    const room = `${user.map(item => item.room)}`;

    const newObjSend = Object.assign([], { ...userSend });
    const newObjRecipient = Object.assign([], { ...userRecipient });

    const userListResult: any = newObjSend.concat(newObjRecipient);

    userListResult.map((item: any) => item.image = `${fullUrl}/${item.image}`)
    user.map(itemRoom =>
        userListResult.map((itemUser: any) => {
            if (itemUser.id === itemRoom.user_sender.id || itemRoom.user_recipient.id === itemUser.id) {
                itemUser.room = itemRoom.room
            }
        })
    )

    return userListResult;
}

export { getUserService }
