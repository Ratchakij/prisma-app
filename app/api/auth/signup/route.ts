import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!password) { return new Response('Password is required', { status: 400 }); }

        const hashedPassword = await bcrypt.hash(password, 10);
        // const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        });
        return Response.json({ message: "Created User Successful !!!", data: newUser });
    } catch (error) {
        return Response.json({ error: 'User could not be created', status: 500 })
        // return new Response(error as BodyInit, { status: 500, });
    }
}