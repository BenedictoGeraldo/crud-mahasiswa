export type ApiErrorItem = {
  field?: string;
  message: string;
};

export type ApiMeta = {
  page?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: ApiErrorItem[];
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
