import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

async function loginService(data: any) {

    const email = `${data.email}`;
    const password = `${data.password}`;

    const user = await prisma.user.findFirst({
        where: { email: email },
        select: {
            public_id: true,
            name: true,
            email: true,
            password: true,
            image: true,
        }
    });

    const hash = `${user?.password}`;

    const verifyPassword = bcrypt.compareSync(password, hash);

    if (!verifyPassword) return verifyPassword;

    const token = jwt.sign({ data: { id: user?.public_id, email: user?.email } }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userResult = { id: user?.public_id, name: user?.name, email: user?.email, image: user?.image };

    return { token, userResult }

}

export { loginService }