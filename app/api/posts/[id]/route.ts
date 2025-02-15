import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
   try {
      const { id } = await params;
      const postId = Number(id);

      if (isNaN(postId)) { return new Response('Invalid post ID', { status: 400 }); }

      const post = await prisma.post.findUnique({
         where: { id: postId },
         include: { category: true, },
      });

      if (!post) { return new Response('Post not found', { status: 404 }); }

      return Response.json(post);
   } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
   }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
   try {
      const { id } = await params;
      const postId = Number(id);
      const { title, content, categoryId } = await request.json();

      const post = await prisma.post.update({
         where: { id: postId },
         data: { title, content, categoryId: Number(categoryId) },
      });

      return Response.json(post);
   } catch (error) {
      return new Response(error as BodyInit, {
         status: 500,
      });
   }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
   try {
      const { id } = await params;
      const postId = Number(id);

      const deletedPost = await prisma.post.delete({
         where: { id: postId },
      });

      return Response.json(deletedPost);
   } catch (error) {
      return new Response(error as BodyInit, { status: 500, });
   }
}
