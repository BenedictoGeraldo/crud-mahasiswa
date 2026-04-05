import {
  errorResponse,
  internalServerErrorResponse,
  okResponse,
} from "@/lib/api-response/formatter";
import { mockDataPath, readJsonFile } from "@/lib/utils";
import { NextRequest } from "next/server";

type User = {
  id: number;
  email: string;
  password: string;
  name?: string;
  is_active: boolean;
  register_date: string;
};

const USERS_FILE = mockDataPath("users.json");

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(request: NextRequest) {
  try {
    let rawBody: unknown;

    try {
      rawBody = await request.json();
    } catch {
      return errorResponse("Request Body JSON tidak valid", { status: 400 });
    }

    const body = (rawBody ?? {}) as Partial<User>;
    const email = normalize(body.email).toLowerCase();
    const password = normalize(body.password);

    const errors: Array<{ field: string; message: string }> = [];

    if (!email) errors.push({ field: "email", message: "Email wajib diisi" });
    if (!password)
      errors.push({ field: "password", message: "Password wajib diisi" });

    if (errors.length > 0) {
      return errorResponse("Validasi gagal", { status: 422, errors });
    }

    const allUsers = await readJsonFile<User[]>(USERS_FILE);
    const user = allUsers.find((item) => item.email.toLowerCase() === email);

    if (!user) {
      return errorResponse("Email atau password salah", { status: 401 });
    }

    if (!user.is_active) {
      return errorResponse("Akun tidak aktif", { status: 403 });
    }

    if (user.password !== password) {
      return errorResponse("Email atau password salah", { status: 401 });
    }

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      is_active: user.is_active,
      register_date: user.register_date,
    };

    return okResponse(userResponse, { message: "Login berhasil" });
  } catch {
    return internalServerErrorResponse("Gagal memproses login");
  }
}
