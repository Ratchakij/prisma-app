// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string; // เพิ่มฟิลด์ role ใน User
    }

    interface Session {
        user: User; // ทำให้ session.user เป็นประเภท User ที่ขยายแล้ว
    }
}
