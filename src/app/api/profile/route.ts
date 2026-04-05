import {
  errorResponse,
  internalServerErrorResponse,
  okResponse,
  unauthorizedResponse,
} from "@/lib/api-response/formatter";
import { mockDataPath, readJsonFile, writeJsonFile } from "@/lib/utils";
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

function getUserIdFromHeader(authHeader: string | null): number | null {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;

  const token = parts[1];
  const userId = Number(token);

  return Number.isInteger(userId) && userId > 0 ? userId : null;
}

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toPublicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    is_active: user.is_active,
    register_date: user.register_date,
  };
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const userId = getUserIdFromHeader(authHeader);

    if (!userId) {
      return unauthorizedResponse("Token tidak valid atau tidak ada");
    }

    const allUsers = await readJsonFile<User[]>(USERS_FILE);
    const user = allUsers.find((item) => item.id === userId);

    if (!user) {
      return errorResponse("User tidak ditemukan", { status: 404 });
    }

    if (!user.is_active) {
      return errorResponse("Akun Anda tidak aktif", { status: 403 });
    }

    return okResponse(toPublicUser(user), {
      message: "Profil berhasil diambil",
    });
  } catch {
    return internalServerErrorResponse("Gagal mengambil profil");
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const userId = getUserIdFromHeader(authHeader);

    if (!userId) {
      return unauthorizedResponse("Token tidak valid atau tidak ada");
    }

    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    const validationErrors: Array<{ field: string; message: string }> = [];

    if (!name) {
      validationErrors.push({ field: "name", message: "Nama wajib diisi" });
    }

    if (!email) {
      validationErrors.push({ field: "email", message: "Email wajib diisi" });
    } else if (!isEmailValid(email)) {
      validationErrors.push({
        field: "email",
        message: "Format email tidak valid",
      });
    }

    if (validationErrors.length > 0) {
      return errorResponse("Validasi gagal", {
        status: 422,
        errors: validationErrors,
      });
    }

    const allUsers = await readJsonFile<User[]>(USERS_FILE);
    const userIndex = allUsers.findIndex((item) => item.id === userId);

    if (userIndex === -1) {
      return errorResponse("User tidak ditemukan", { status: 404 });
    }

    const currentUser = allUsers[userIndex];

    if (!currentUser.is_active) {
      return errorResponse("Akun Anda tidak aktif", { status: 403 });
    }

    const duplicateEmail = allUsers.find(
      (item) => item.email.toLowerCase() === email && item.id !== userId,
    );

    if (duplicateEmail) {
      return errorResponse("Email sudah digunakan pengguna lain", {
        status: 409,
        errors: [{ field: "email", message: "Email sudah terdaftar" }],
      });
    }

    const updatedUser: User = {
      ...currentUser,
      name,
      email,
    };

    allUsers[userIndex] = updatedUser;
    await writeJsonFile<User[]>(USERS_FILE, allUsers);

    return okResponse(toPublicUser(updatedUser), {
      message: "Profil berhasil diperbarui",
    });
  } catch {
    return internalServerErrorResponse("Gagal memperbarui profil");
  }
}
