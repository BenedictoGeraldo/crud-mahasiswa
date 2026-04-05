"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  mahasiswaSchema,
  MahasiswaSchema,
} from "@/features/mahasiswa/schemas/mahasiswa.schema";
import { createMahasiswa } from "@/features/mahasiswa/services/mahasiswa.service";
import { useState } from "react";

export function useCreateMahasiswaForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>("");

  const form = useForm<MahasiswaSchema>({
    resolver: zodResolver(mahasiswaSchema),
    defaultValues: {
      nim: "",
      nama: "",
      email: "",
      jurusan: undefined,
      tanggal_lahir: "",
    },
  });

  const onSubmit = async (data: MahasiswaSchema) => {
    try {
      setFormError("");
      await createMahasiswa(data);
      router.push("/mahasiswa");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menambah data mahasiswa";

      setFormError(message);
    }
  };

  return { form, formError, onSubmit };
}
