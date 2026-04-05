import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password dan konfirmasi password tidak cocok",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
