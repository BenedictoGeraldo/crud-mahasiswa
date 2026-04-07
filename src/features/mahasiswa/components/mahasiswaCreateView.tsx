"use client";

import { Paper, Container, Typography, Box } from "@mui/material";
import { MahasiswaForm } from "./mahasiswaForm";
import { GlobalDialog } from "@/components/ui/globalDialog";
import { useCreateMahasiswaForm } from "@/features/mahasiswa/hooks/useCreateMahasiswaForm";

export function MahasiswaCreateView() {
  const {
    form,
    formError,
    onSubmit,
    showConfirmation,
    onConfirmSave,
    onCancelConfirmation,
  } = useCreateMahasiswaForm();

  return (
    <Container maxWidth="md" className="py-8">
      <Paper elevation={0} className="p-8" sx={{ backgroundColor: "#f8f6f1" }}>
        <Box className="mb-8">
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1f2937", mb: 2 }}
          >
            Tambah Mahasiswa
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Isi form di bawah untuk menambahkan data mahasiswa baru
          </Typography>
        </Box>

        <MahasiswaForm
          form={form}
          onSubmit={onSubmit}
          error={formError}
          isLoading={form.formState.isSubmitting}
        />
      </Paper>

      <GlobalDialog
        open={showConfirmation}
        title="Konfirmasi Penyimpanan"
        message="Apakah Anda yakin ingin menyimpan data mahasiswa ini?"
        onClose={onCancelConfirmation}
        onConfirm={() => {
          void onConfirmSave();
        }}
        confirmText="Ya, Simpan"
        cancelText="Batal"
        loading={form.formState.isSubmitting}
      />
    </Container>
  );
}
