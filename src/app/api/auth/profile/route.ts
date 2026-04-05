import {
  errorResponse,
  internalServerErrorResponse,
  okResponse,
  unauthorizedResponse,
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

function getUserIdFromHeader(authHeader: string | null): number | null {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;

  const token = parts[1];
  const userId = Number(token);

  return Number.isInteger(userId) && userId > 0 ? userId : null;
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

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      is_active: user.is_active,
      register_date: user.register_date,
    };

    return okResponse(userResponse, { message: "Profil berhasil diambil" });
  } catch {
    return internalServerErrorResponse("Gagal mengambil profil");
  }
}
