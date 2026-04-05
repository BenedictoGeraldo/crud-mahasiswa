"use client";

import { useEffect, useState } from "react";
import { getMahasiswaById } from "@/features/mahasiswa/services/mahasiswa.service";
import type { Mahasiswa } from "@/features/mahasiswa/types/mahasiswa.type";

type UseMahasiswaDetailResult = {
  data: Mahasiswa | null;
  loading: boolean;
  errorMessage: string;
};

export function useMahasiswaDetail(id: number): UseMahasiswaDetailResult {
  const [data, setData] = useState<Mahasiswa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function loadDetail() {
      try {
        setLoading(true);
        setErrorMessage("");

        if (!Number.isFinite(id) || id <= 0) {
          throw new Error("ID mahasiswa tidak valid.");
        }

        const result = await getMahasiswaById(id);

        if (isMounted) {
          setData(result);
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Gagal mengambil detail mahasiswa.";
        if (isMounted) {
          setErrorMessage(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, loading, errorMessage };
}
