import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const postId = Number(params.id);
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    return Response.json(post)
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { title, content } = await request.json();
        const postId = Number(params.id);

        const updatePost = await prisma.post.update({
            where: { id: postId },
            data: { title, content }
        })

        return Response.json(updatePost)
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const postId = Number(params.id);
        const deletedPost = await prisma.post.delete({
            where: { id: postId }
        })

        return Response.json(deletedPost);
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}