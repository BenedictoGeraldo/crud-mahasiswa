"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  mahasiswaSchema,
  MahasiswaSchema,
} from "@/features/mahasiswa/schemas/mahasiswa.schema";
import {
  getMahasiswaById,
  updateMahasiswa,
} from "@/features/mahasiswa/services/mahasiswa.service";

type UseEditMahasiswaFormResult = {
  form: ReturnType<typeof useForm<MahasiswaSchema>>;
  formError: string;
  loadingDetail: boolean;
  onSubmit: (data: MahasiswaSchema) => Promise<void>;
  showConfirmation: boolean;
  onConfirmSave: () => Promise<void>;
  onCancelConfirmation: () => void;
};

export function useEditMahasiswaForm(id: number): UseEditMahasiswaFormResult {
  const router = useRouter();
  const [formError, setFormError] = useState<string>("");
  const [loadingDetail, setLoadingDetail] = useState<boolean>(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingData, setPendingData] = useState<MahasiswaSchema | null>(null);

  const form = useForm<MahasiswaSchema>({
    resolver: zodResolver(mahasiswaSchema),
    defaultValues: {
      nim: "",
      nama: "",
      email: "",
      jurusan: "",
      tanggal_lahir: "",
    },
  });

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        setLoadingDetail(true);
        setFormError("");

        if (!Number.isFinite(id) || id <= 0) {
          throw new Error("ID mahasiswa tidak valid.");
        }

        const detail = await getMahasiswaById(id);

        if (isMounted) {
          form.reset({
            nim: detail.nim,
            nama: detail.nama,
            email: detail.email,
            jurusan: detail.jurusan,
            tanggal_lahir: detail.tanggal_lahir ?? "",
          });
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Gagal mengambil data mahasiswa.";
        if (isMounted) {
          setFormError(message);
        }
      } finally {
        if (isMounted) {
          setLoadingDetail(false);
        }
      }
    }

    void loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [id, form]);

  const onSubmit = async (data: MahasiswaSchema) => {
    if (!form.formState.isDirty) {
      return;
    }

    setPendingData(data);
    setShowConfirmation(true);
  };

  const onConfirmSave = async () => {
    if (!pendingData) return;

    try {
      setFormError("");
      await updateMahasiswa(id, pendingData);
      setShowConfirmation(false);
      setPendingData(null);
      router.push(`/mahasiswa/${id}`);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal memperbarui data mahasiswa.";
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
    loadingDetail,
    onSubmit,
    showConfirmation,
    onConfirmSave,
    onCancelConfirmation,
  };
}
