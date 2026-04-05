import {
  errorResponse,
  internalServerErrorResponse,
  notFoundResponse,
  okResponse,
} from "@/lib/api-response/formatter";
import {
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

function toPositiveInt(value: unknown): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : -1;
}

function normalize(value: unknown): string {
  return String(value ?? "").trim();
}

function isValidDateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const mahasiswaId = toPositiveInt(id);

    if (mahasiswaId === -1) {
      return errorResponse("ID mahasiswa tidak valid", { status: 400 });
    }

    const allMahasiswa = await readJsonFile<Mahasiswa[]>(MAHASISWA_FILE);
    const mahasiswa = allMahasiswa.find((item) => item.id === mahasiswaId);

    if (!mahasiswa) {
      return notFoundResponse("Mahasiswa tidak ditemukan");
    }

    return okResponse(mahasiswa, {
      message: "Detail mahasiswa berhasil diambil",
    });
  } catch {
    return internalServerErrorResponse("Gagal mengambil detail mahasiswa");
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const mahasiswaId = toPositiveInt(id);

    if (mahasiswaId === -1) {
      return errorResponse("ID mahasiswa tidak valid", { status: 400 });
    }

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

    if (nim && !/^[\w\d-]+$/.test(nim)) {
      errors.push({ field: "nim", message: "Format NIM tidak valid" });
    }

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
    const mahasiswaIndex = allMahasiswa.findIndex(
      (item) => item.id === mahasiswaId,
    );

    if (mahasiswaIndex === -1) {
      return notFoundResponse("Mahasiswa tidak ditemukan");
    }

    const mahasiswa = allMahasiswa[mahasiswaIndex];

    if (nim && nim !== mahasiswa.nim) {
      const isNimUsed = allMahasiswa.some((item) => item.nim === nim);
      if (isNimUsed) {
        return errorResponse("NIM sudah digunakan", {
          status: 409,
          errors: [{ field: "nim", message: "NIM harus unik" }],
        });
      }
    }

    if (email && email !== mahasiswa.email.toLowerCase()) {
      const isEmailUsed = allMahasiswa.some(
        (item) => item.email.toLowerCase() === email,
      );
      if (isEmailUsed) {
        return errorResponse("Email sudah digunakan", {
          status: 409,
          errors: [{ field: "email", message: "Email harus unik" }],
        });
      }
    }

    const updatedMahasiswa: Mahasiswa = {
      ...mahasiswa,
      ...(nim && { nim }),
      ...(nama && { nama }),
      ...(email && { email }),
      ...(jurusan && { jurusan }),
      ...(tanggal_lahir !== undefined && {
        tanggal_lahir: tanggal_lahir || undefined,
      }),
      updated_at: nowIsoString(),
    };

    const nextData = [
      ...allMahasiswa.slice(0, mahasiswaIndex),
      updatedMahasiswa,
      ...allMahasiswa.slice(mahasiswaIndex + 1),
    ];

    await writeJsonFile(MAHASISWA_FILE, nextData);

    return okResponse(updatedMahasiswa, {
      message: "Mahasiswa berhasil diperbarui",
    });
  } catch {
    return internalServerErrorResponse("Gagal memperbarui mahasiswa");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const mahasiswaId = toPositiveInt(id);

    if (mahasiswaId === -1) {
      return errorResponse("ID mahasiswa tidak valid", { status: 400 });
    }

    const allMahasiswa = await readJsonFile<Mahasiswa[]>(MAHASISWA_FILE);
    const mahasiswaIndex = allMahasiswa.findIndex(
      (item) => item.id === mahasiswaId,
    );

    if (mahasiswaIndex === -1) {
      return notFoundResponse("Mahasiswa tidak ditemukan");
    }

    const deletedMahasiswa = allMahasiswa[mahasiswaIndex];
    const nextData = [
      ...allMahasiswa.slice(0, mahasiswaIndex),
      ...allMahasiswa.slice(mahasiswaIndex + 1),
    ];

    await writeJsonFile(MAHASISWA_FILE, nextData);

    return okResponse(deletedMahasiswa, {
      message: "Mahasiswa berhasil dihapus",
    });
  } catch {
    return internalServerErrorResponse("Gagal menghapus mahasiswa");
  }
}
