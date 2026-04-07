import { z } from "zod";

export const jurusanOptions = [
  "Informatika",
  "Sistem Informasi",
  "Teknik Elektro",
  "Manajemen",
] as const;

export const mahasiswaSchema = z.object({
  nim: z
    .string()
    .regex(/^[0-9]+$/, "NIM hanya boleh angka")
    .min(1, "NIM wajib diisi")
    .min(10, "Nim minimal 10 karakter")
    .max(10, "Nim hanya boleh 10 karakter"),
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  jurusan: z.enum(jurusanOptions, {
    error: "Jurusan wajib dipilih",
  }),
  tanggal_lahir: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
      "Tanggal lahir harus format YYYY-MM-DD",
    ),
});

export type MahasiswaSchema = z.infer<typeof mahasiswaSchema>;
