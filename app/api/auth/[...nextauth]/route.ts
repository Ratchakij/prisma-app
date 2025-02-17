import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient, User as PrismaUser } from '@prisma/client'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'

const prisma = new PrismaClient()

interface Credentials {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: Credentials | undefined, req) {
                if (!credentials) { return null; }

                try {
                    const user: PrismaUser | null = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    })

                    if (user && (await bcrypt.compare(credentials.password, user.password))) {
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    } else {
                        throw new Error('Invalid email or password')
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                    throw new Error('Something went wrong. Please try again later.');
                }

            },
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token, user }: { token: any; user?: User }) => {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token
        },
        session: async ({ session, token }: { session: any; token: any }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session
        }
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }