import { db } from "../../database";
import { cookies } from "next/headers";
import { generateToken } from "@/utils/auth.utils";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(req: Request) {
  const body = await req.json();

  const { emailId, password } = body;

  return new Promise((resolve) => {
    db.get(
      "SELECT * FROM users where emailId = ?",
      [emailId],
      async (err: Error, user: any) => {
        if (err || !user) {
          return resolve(
            Response.json({ message: "Invalid credentials", status: 401 })
          );
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return resolve(
            Response.json({ message: "Invalid credentials" }, { status: 401 })
          );
        }

        const token: string = generateToken({
          userId: user.id,
          email: user.emailId
        });

        (await cookies()).set({
          name: "auth-token",
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 // 24 hours
        });

        resolve(
          Response.json(
            { message: "Login successful" },
            { status: 200 }
          )
        );
      }
    );
  });
}
