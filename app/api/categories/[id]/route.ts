import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const categoryId = Number(id)
        const categoryWithPosts = await prisma.category.findUnique({
            where: { id: categoryId },
            include: {
                posts: true, // Include related posts in the response
            },
        })
        return Response.json(categoryWithPosts)
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const { name } = await req.json()
        const category = await prisma.category.update({
            where: { id: Number(id) },
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