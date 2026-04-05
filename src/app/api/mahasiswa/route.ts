import {
  createdResponse,
  errorResponse,
  internalServerErrorResponse,
  okResponse,
  paginationMeta,
} from "@/lib/api-response/formatter";
import {
  getNextNumericId,
  mockDataPath,
  nowIsoString,
  readJsonFile,
  writeJsonFile,
} from "@/lib/utils";
import { NextRequest } from "next/server";

type Jurusan =
  | "Informatika"
  | "Sistem Informasi"
  | "Teknik Elektro"
  | "Manajemen";

type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  email: string;
  jurusan: Jurusan;
  tanggal_lahir?: string;
  created_at: string;
  updated_at: string;
};

const MAHASISWA_FILE = mockDataPath("mahasiswa.json");
const ALLOWED_JURUSAN: Jurusan[] = [
  "Informatika",
  "Sistem Informasi",
  "Teknik Elektro",
  "Manajemen",
];

function toPositiveInt(value: string | null, defaultValue: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return defaultValue;
  return parsed;
}

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function isValidDateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const q = normalize(searchParams.get("q")).toLowerCase();
    const page = toPositiveInt(searchParams.get("page"), 1);
    const pageSize = toPositiveInt(searchParams.get("pageSize"), 10);

    const allMahasiswa = await readJsonFile<Mahasiswa[]>(MAHASISWA_FILE);

    const filtered = q
      ? allMahasiswa.filter((item) => {
          const nim = item.nim.toLowerCase();
          const email = item.email.toLowerCase();
          return nim.includes(q) || email.includes(q);
        })
      : allMahasiswa;

    const totalItems = filtered.length;
    const safePageSize = Math.min(pageSize, 100);
    const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
    const safePage = Math.min(page, totalPages);

    const start = (safePage - 1) * safePageSize;
    const end = start + safePageSize;

    const rows = filtered.slice(start, end);
    const meta = paginationMeta({
      page: safePage,
      pageSize: safePageSize,
      totalItems,
    });

    return okResponse(rows, {
      message: "Daftar mahasiswa berhasil diambil",
      meta,
    });
  } catch {
    return internalServerErrorResponse("Gagal mengambil data mahasiswa");
  }
}

export async function POST(request: NextRequest) {
  try {
    let rawBody: unknown;

    try {
      rawBody = await request.json();
    } catch {
      return errorResponse("Body JSON tidak valid", { status: 400 });
    }

    const body = (rawBody ?? {}) as Partial<Mahasiswa>;
    const nim = normalize(body.nim);
    const nama = normalize(body.nama);
    const email = normalize(body.email).toLowerCase();
    const jurusan = normalize(body.jurusan) as Jurusan;
    const tanggal_lahir = normalize(body.tanggal_lahir);

    const errors: Array<{ field: string; message: string }> = [];

    if (!nim) errors.push({ field: "nim", message: "NIM wajib diisi" });
    if (!nama) errors.push({ field: "nama", message: "Nama wajib diisi" });
    if (!email) errors.push({ field: "email", message: "Email wajib diisi" });
    if (!jurusan)
      errors.push({ field: "jurusan", message: "Jurusan wajib diisi" });

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: "email", message: "Format email tidak valid" });
    }

    if (jurusan && !ALLOWED_JURUSAN.includes(jurusan)) {
      errors.push({ field: "jurusan", message: "Jurusan tidak valid" });
    }

    if (tanggal_lahir && !isValidDateOnly(tanggal_lahir)) {
      errors.push({
        field: "tanggal_lahir",
        message: "Tanggal lahir harus format YYYY-MM-DD",
      });
    }

    if (errors.length > 0) {
      return errorResponse("Validasi gagal", { status: 422, errors });
    }

    const allMahasiswa = await readJsonFile<Mahasiswa[]>(MAHASISWA_FILE);

    const isNimUsed = allMahasiswa.some((item) => item.nim === nim);
    if (isNimUsed) {
      return errorResponse("NIM sudah digunakan", {
        status: 409,
        errors: [{ field: "nim", message: "NIM harus unik" }],
      });
    }

    const isEmailUsed = allMahasiswa.some(
      (item) => item.email.toLowerCase() === email,
    );
    if (isEmailUsed) {
      return errorResponse("Email sudah digunakan", {
        status: 409,
        errors: [{ field: "email", message: "Email harus unik" }],
      });
    }

    const now = nowIsoString();

    const newMahasiswa: Mahasiswa = {
      id: getNextNumericId(allMahasiswa),
      nim,
      nama,
      email,
      jurusan,
      tanggal_lahir: tanggal_lahir || undefined,
      created_at: now,
      updated_at: now,
    };

    const nextData = [...allMahasiswa, newMahasiswa];
    await writeJsonFile(MAHASISWA_FILE, nextData);

    return createdResponse(newMahasiswa, "Mahasiswa berhasil ditambahkan");
  } catch {
    return internalServerErrorResponse("Gagal menambahkan mahasiswa");
  }
}
