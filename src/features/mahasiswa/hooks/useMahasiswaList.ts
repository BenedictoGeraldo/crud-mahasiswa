"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteMahasiswa,
  getMahasiswaList,
} from "@/features/mahasiswa/services/mahasiswa.service";
import type { Mahasiswa } from "@/features/mahasiswa/types/mahasiswa.type";

type ApiLikeError = {
  message?: string;
};

const DEFAULT_PAGE_SIZE = 10;

export function useMahasiswaList() {
  const [rows, setRows] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedDelete, setSelectedDelete] = useState<Mahasiswa | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setQuery(queryInput.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [queryInput]);

  const loadList = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const result = await getMahasiswaList({
        q: query || undefined,
        page,
        pageSize,
      });

      setRows(result.rows);
      setTotalPages(result.meta.totalPages || 1);
    } catch (error: unknown) {
      const apiError = error as ApiLikeError;
      setErrorMessage(apiError.message || "Gagal memuat daftar mahasiswa.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, query]);

  useEffect(() => {
    void loadList();
  }, [loadList]);

  const openDeleteDialog = (row: Mahasiswa) => setSelectedDelete(row);
  const closeDeleteDialog = () => {
    if (!deleting) setSelectedDelete(null);
  };

  const confirmDelete = async () => {
    if (!selectedDelete) return;

    try {
      setDeleting(true);
      setErrorMessage("");
      setSuccessMessage("");

      await deleteMahasiswa(selectedDelete.id);

      setSuccessMessage("Data mahasiswa berhasil dihapus.");
      setSelectedDelete(null);

      const result = await getMahasiswaList({
        q: query || undefined,
        page,
        pageSize,
      });

      setRows(result.rows);

      const nextTotalPages = result.meta.totalPages || 1;
      setTotalPages(nextTotalPages);

      if (page > nextTotalPages) {
        setPage(nextTotalPages);
      }
    } catch (error: unknown) {
      const apiError = error as ApiLikeError;
      setErrorMessage(apiError.message || "Gagal menghapus data mahasiswa.");
    } finally {
      setDeleting(false);
    }
  };

  const isEmpty = useMemo(() => !loading && rows.length === 0, [loading, rows]);

  return {
    rows,
    loading,
    deleting,
    isEmpty,
    errorMessage,
    successMessage,
    queryInput,
    setQueryInput,
    page,
    setPage,
    totalPages,
    selectedDelete,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
}
