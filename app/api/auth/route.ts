// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

// const user = {
//   id: 1,
//   username: "admin",
//   password: "$2a$10$V3OcbmZt6lJ0cF1W7IXGdu5N5e/E09A93jxl45U9f.JmAkT2J2AEG", // bcrypt hash of "password123"
// };

// export async function POST(request: Request) {
//   try {
//     const { username, password } = await request.json();

//     if (username !== user.username) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }
//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     const response = NextResponse.json({ message: "Login successful" });
//     response.cookies.set("auth-token", token, { httpOnly: true, path: "/" });
//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";
const USERS_FILE = path.join(process.cwd(), "users.json");

const getUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return JSON.parse(data);
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const users = getUsers();
    const user = users.find((user: any) => user.username === username);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("auth-token", token, { httpOnly: true, path: "/" });
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
