"use client";

import { useForm, UseFormReturn } from "react-hook-form";
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingData, setPendingData] = useState<MahasiswaSchema | null>(null);

  const form = useForm<MahasiswaSchema>({
    resolver: zodResolver(mahasiswaSchema),
    mode: "onSubmit",
    defaultValues: {
      nim: "",
      nama: "",
      email: "",
      jurusan: "",
      tanggal_lahir: "",
    },
  }) as UseFormReturn<MahasiswaSchema>;

  const onFormSubmit = async (data: MahasiswaSchema) => {
    // Validate all fields
    const isValid = await form.trigger();

    if (!isValid) {
      return;
    }

    // If validation passes, show confirmation dialog
    setPendingData(data);
    setShowConfirmation(true);
  };

  const onConfirmSave = async () => {
    if (!pendingData) return;

    try {
      setFormError("");
      await createMahasiswa(pendingData);
      setShowConfirmation(false);
      setPendingData(null);
      router.push("/mahasiswa");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menambah data mahasiswa";

      setFormError(message);
      setShowConfirmation(false);
    }
  };

  const onCancelConfirmation = () => {
    setShowConfirmation(false);
    setPendingData(null);
  };

  return {
    form,
    formError,
    onSubmit: onFormSubmit,
    showConfirmation,
    onConfirmSave,
    onCancelConfirmation,
    pendingData,
  };
}
