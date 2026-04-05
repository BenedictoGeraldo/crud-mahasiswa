import {
  createdResponse,
  errorResponse,
  internalServerErrorResponse,
} from "@/lib/api-response/formatter";
import {
  getNextNumericId,
  mockDataPath,
  nowIsoString,
  readJsonFile,
  writeJsonFile,
} from "@/lib/utils";
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
      return errorResponse("Body JSON tidak valid", { status: 400 });
    }

    const body = (rawBody ?? {}) as Partial<User>;
    const email = normalize(body.email).toLowerCase();
    const password = normalize(body.password);
    const name = normalize(body.name);

    const errors: Array<{ field: string; message: string }> = [];

    if (!email) errors.push({ field: "email", message: "Email wajib diisi" });
    if (!password)
      errors.push({ field: "password", message: "Password wajib diisi" });
    if (!name) errors.push({ field: "name", message: "Nama wajib diisi" });

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: "email", message: "Format email tidak valid" });
    }

    if (password && password.length < 6) {
      errors.push({
        field: "password",
        message: "Password minimal 6 karakter",
      });
    }

    if (errors.length > 0) {
      return errorResponse("Validasi gagal", { status: 422, errors });
    }

    const allUsers = await readJsonFile<User[]>(USERS_FILE);

    const isEmailUsed = allUsers.some(
      (item) => item.email.toLowerCase() === email,
    );
    if (isEmailUsed) {
      return errorResponse("Email sudah terdaftar", {
        status: 409,
        errors: [{ field: "email", message: "Email sudah digunakan" }],
      });
    }

    const newUser: User = {
      id: getNextNumericId(allUsers),
      email,
      password,
      name,
      is_active: true,
      register_date: nowIsoString(),
    };

    const nextData = [...allUsers, newUser];
    await writeJsonFile(USERS_FILE, nextData);

    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      is_active: newUser.is_active,
      register_date: newUser.register_date,
    };

    return createdResponse(userResponse, "Registrasi berhasil");
  } catch {
    return internalServerErrorResponse("Gagal melakukan registrasi");
  }
}
