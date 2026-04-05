import { axiosInstance } from "@/lib/axios/client";
import type { ApiResponse } from "@/types/api";
import type {
  Mahasiswa,
  MahasiswaCreatePayload,
  MahasiswaListParams,
  MahasiswaUpdatePayload,
} from "../types/mahasiswa.type";

type PaginationMeta = {
  page?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

type MahasiswaListResult = {
  rows: Mahasiswa[];
  meta: PaginationMeta;
};

function unwrapApiResponse<T>(payload: ApiResponse<T>): T {
  if (!payload.success) {
    throw {
      status: 400,
      message: payload.message,
      errors: payload.errors ?? [],
    };
  }

  return payload.data;
}

export async function getMahasiswaList(
  params: MahasiswaListParams = {},
): Promise<MahasiswaListResult> {
  const response = await axiosInstance.get<ApiResponse<Mahasiswa[]>>(
    "/mahasiswa",
    {
      params,
    },
  );

  const rows = unwrapApiResponse(response.data);
  const meta = response.data.success ? (response.data.meta ?? {}) : {};

  return { rows, meta };
}

export async function getMahasiswaById(id: number): Promise<Mahasiswa> {
  const response = await axiosInstance.get<ApiResponse<Mahasiswa>>(
    `/mahasiswa/${id}`,
  );

  return unwrapApiResponse(response.data);
}

export async function createMahasiswa(
  payload: MahasiswaCreatePayload,
): Promise<Mahasiswa> {
  const response = await axiosInstance.post<ApiResponse<Mahasiswa>>(
    "/mahasiswa",
    payload,
  );

  return unwrapApiResponse(response.data);
}

export async function updateMahasiswa(
  id: number,
  payload: MahasiswaUpdatePayload,
): Promise<Mahasiswa> {
  const response = await axiosInstance.patch<ApiResponse<Mahasiswa>>(
    `/mahasiswa/${id}`,
    payload,
  );

  return unwrapApiResponse(response.data);
}

export async function deleteMahasiswa(id: number): Promise<Mahasiswa> {
  const response = await axiosInstance.delete<ApiResponse<Mahasiswa>>(
    `/mahasiswa/${id}`,
  );

  return unwrapApiResponse(response.data);
}
