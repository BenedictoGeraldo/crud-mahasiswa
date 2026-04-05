"use client";

import { Paper, Container, Typography, Box } from "@mui/material";
import { MahasiswaForm } from "./mahasiswaForm";
import { useCreateMahasiswaForm } from "@/features/mahasiswa/hooks/useCreateMahasiswaForm";

export function MahasiswaCreateView() {
  const { form, formError, onSubmit } = useCreateMahasiswaForm();

  return (
    <Container maxWidth="md" className="py-8">
      <Paper elevation={0} className="p-8" sx={{ backgroundColor: "#f8f6f1" }}>
        <Box className="mb-8">
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
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
    </Container>
  );
}
