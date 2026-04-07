"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useRouter } from "next/navigation";
import { GlobalDialog } from "@/components/ui/globalDialog";
import { MahasiswaForm } from "@/features/mahasiswa/components/mahasiswaForm";
import { useEditMahasiswaForm } from "@/features/mahasiswa/hooks/useEditMahasiswaForm";

type MahasiswaEditViewProps = {
  id: number;
};

export function MahasiswaEditView({ id }: MahasiswaEditViewProps) {
  const router = useRouter();
  const {
    form,
    formError,
    loadingDetail,
    onSubmit,
    showConfirmation,
    onConfirmSave,
    onCancelConfirmation,
  } = useEditMahasiswaForm(id);

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
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#1f2937" }}
              >
                Edit Mahasiswa
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Perbarui data mahasiswa dengan benar.
              </Typography>
            </Box>

            <Button
              variant="text"
              startIcon={<ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />}
              onClick={() => router.push(`/mahasiswa`)}
              sx={{
                textTransform: "none",
                color: "#6b7280",
                fontWeight: 600,
                px: 0.5,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#1f2937",
                },
              }}
            >
              Kembali
            </Button>
          </Stack>

          {loadingDetail ? (
            <Box className="flex items-center justify-center py-16">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {formError ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formError}
                </Alert>
              ) : null}
              <MahasiswaForm
                form={form}
                onSubmit={onSubmit}
                isLoading={form.formState.isSubmitting}
              />
            </>
          )}
        </Paper>
      </Box>

      <GlobalDialog
        open={showConfirmation}
        title="Konfirmasi Penyimpanan"
        message="Apakah Anda yakin ingin menyimpan perubahan data mahasiswa ini?"
        onClose={onCancelConfirmation}
        onConfirm={() => {
          void onConfirmSave();
        }}
        confirmText="Ya, Simpan"
        cancelText="Batal"
        loading={form.formState.isSubmitting}
      />
    </main>
  );
}
