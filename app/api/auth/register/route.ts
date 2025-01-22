// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// const users: { id: number; username: string; password: string }[] = [];

// const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

// export async function POST(request: Request) {
//   try {
//     const { username, password } = await request.json();
//     const existingUser = users.find((user) => user.username === username);
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       id: users.length + 1,
//       username,
//       password: hashedPassword,
//     };
//     users.push(newUser);
//     const token = jwt.sign(
//       { id: newUser.id, username: newUser.username },
//       SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );
//     const response = NextResponse.json({ message: "Registration successful" });
//     response.cookies.set("auth-token", token, { httpOnly: true, path: "/" });
//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";
const USERS_FILE = path.join(process.cwd(), "users.json");

const getUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return JSON.parse(data);
};

const saveUser = (user: any) => {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const users = getUsers();

    if (users.find((user: any) => user.username === username)) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };

    saveUser(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const response = NextResponse.json({ message: "Registration successful" });
    response.cookies.set("auth-token", token, { httpOnly: true, path: "/" });
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
