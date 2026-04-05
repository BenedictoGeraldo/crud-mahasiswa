export type Jurusan =
  | "Informatika"
  | "Sistem Informasi"
  | "Teknik Elektro"
  | "Manajemen";

export type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  email: string;
  jurusan: Jurusan;
  tanggal_lahir?: string;
  created_at: string;
  updated_at: string;
};

export type MahasiswaListParams = {
  q?: string;
  page?: number;
  pageSize?: number;
};

export type MahasiswaCreatePayload = {
  nim: string;
  nama: string;
  email: string;
  jurusan: Jurusan;
  tanggal_lahir?: string;
};

export type MahasiswaUpdatePayload = Partial<MahasiswaCreatePayload>;
