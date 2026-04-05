import { NextResponse } from "next/server";
import type { ApiErrorItem, ApiMeta } from "@/types/api";

type SuccessOptions = {
  status?: number;
  message?: string;
  meta?: ApiMeta;
};

type ErrorOptions = {
  status?: number;
  errors?: ApiErrorItem[];
};

export function okResponse<T>(data: T, options: SuccessOptions = {}) {
  const { status = 200, message = "Berhasil", meta } = options;

  return NextResponse.json(
    {
      success: true as const,
      message,
      data,
      ...(meta ? { meta } : {}),
    },
    { status },
  );
}

export function createdResponse<T>(data: T, message = "Data berhasil dibuat") {
  return okResponse(data, { status: 201, message });
}

export function errorResponse(message: string, options: ErrorOptions = {}) {
  const { status = 400, errors } = options;

  return NextResponse.json(
    {
      success: false as const,
      message,
      ...(errors && errors.length > 0 ? { errors } : {}),
    },
    { status },
  );
}

export function notFoundResponse(message = "Data tidak ditemukan") {
  return errorResponse(message, { status: 404 });
}

export function unauthorizedResponse(message = "Tidak memiliki akses") {
  return errorResponse(message, { status: 401 });
}

export function internalServerErrorResponse(
  message = "Terjadi kesalahan pada server",
) {
  return errorResponse(message, { status: 500 });
}

export function paginationMeta(params: {
  page: number;
  pageSize: number;
  totalItems: number;
}): ApiMeta {
  const { page, pageSize, totalItems } = params;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
