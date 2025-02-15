import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { name } = await req.json()
        const category = await prisma.category.update({
            where: { id: Number(params.id) },
            data: { name },
        })
        return Response.json(category)
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        return Response.json(
            await prisma.category.delete({
                where: { id: Number(params.id) },
            })
        )
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}