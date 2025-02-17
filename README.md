# Next.js + Prisma

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Description

Use PostgreSQL(pgAdmin) with Docker

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setup Project
npx create-next-app@latest
What is your project named? … prisma-app
Would you like to use TypeScript? … Yes
Would you like to use ESLint? … No
Would you like to use Tailwind CSS? … Yes
Would you like to use `src/` directory? … No
Would you like to use App Router? (recommended) … Yes
Would you like to customize the default import alias (@/*)? … No

// Docker
create docker-compose.yml file
docker-compose up -d
docker ps

// Prisma
npm install prisma --save-dev
npm install @prisma/client // สำหรับใช้ใน Next.js ทำการลงไว้ก่อนเลย
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name "init"
npx prisma migrate dev --name "update model" --create-only
npx prisma generate

// Axios
npm i axios

// Auth -> Prisma
npm install bcrypt
npm install --save-dev @types/bcrypt
npm install next-auth
npm install @auth/prisma-adapter

// Google Sign in
Create&Config Google OAuth for Google Provider -> Client ID, Client secret
Add GoogleProvider from 'next-auth/providers/google'

## Command
docker ps -a // Check container info
docker start 28a0d92aeeba 935e7234c71d
docker restart prisma-app-postgres-1 prisma-app-pgadmin-1

docker-compose down // หยุดและลบคอนเทนเนอร์ทั้งหมด
docker-compose down -v // ลบข้อมูลที่เก็บอยู่ใน volume (ล้าง database)
docker-compose down --rmi all --volumes --remove-orphans /* 
    ลบทุกอย่าง แล้วเริ่มใหม่หมด
    ✅ ลบ container ทั้งหมด
    ✅ ลบ image ที่เกี่ยวข้อง
    ✅ ลบ volumes (ข้อมูลถาวรใน database/container)
    ✅ ลบ orphan containers (container ที่ไม่ได้ถูกใช้แล้ว)
 */

docker-compose up -d // ไม่ Rebuild image(ไม่ทำลายข้อมูล), ใช้เมื่อ ไม่ได้แก้ไขโค้ดใน Dockerfile แต่แค่ต้องการรันใหม่
docker-compose up -d --build // Rebuild image(ไม่ทำลายข้อมูล), ใช้เมื่อมีการเปลี่ยนแปลงใน Dockerfile, image, docker-compose.yml

npx prisma migrate dev --name "addPostTable"
npx prisma generate
