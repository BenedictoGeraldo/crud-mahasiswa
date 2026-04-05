"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMahasiswaDetail } from "@/features/mahasiswa/hooks/useMahasiswaDetail";

type MahasiswaDetailViewProps = {
  id: number;
};

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#6b7280" }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600, color: "#1f2937" }}>
        {value ?? "-"}
      </Typography>
    </Box>
  );
}

export function MahasiswaDetailView({ id }: MahasiswaDetailViewProps) {
  const router = useRouter();
  const { data, loading, errorMessage } = useMahasiswaDetail(id);

  return (
    <main className="min-h-screen bg-[#efede8] px-4 py-6 md:py-10">
      <Box className="mx-auto w-full max-w-4xl">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "16px",
            border: "1px solid #dccfa8",
            backgroundColor: "#f8f6f1",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#1f2937" }}
              >
                Detail Mahasiswa
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Informasi lengkap data mahasiswa.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                onClick={() => router.push("/mahasiswa")}
              >
                Kembali
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push(`/mahasiswa/${id}/edit`)}
                sx={{
                  backgroundColor: "#c9a227",
                  "&:hover": { backgroundColor: "#b48e1f" },
                }}
              >
                Edit
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <Box className="flex items-center justify-center py-16">
              <CircularProgress />
            </Box>
          ) : null}

          {!loading && errorMessage ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : null}

          {!loading && !errorMessage && data ? (
            <Stack spacing={2.5}>
              <DetailItem label="ID" value={data.id} />
              <DetailItem label="NIM" value={data.nim} />
              <DetailItem label="Nama" value={data.nama} />
              <DetailItem label="Email" value={data.email} />
              <DetailItem label="Jurusan" value={data.jurusan} />
              <DetailItem
                label="Tanggal Lahir"
                value={data.tanggal_lahir ?? "-"}
              />
              <DetailItem label="Dibuat Pada" value={data.created_at} />
              <DetailItem label="Diupdate Pada" value={data.updated_at} />
            </Stack>
          ) : null}
        </Paper>
      </Box>
    </main>
  );
}
