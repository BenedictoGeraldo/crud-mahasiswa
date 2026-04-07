"use client";

import {
  Paper,
  Container,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { MahasiswaForm } from "./mahasiswaForm";
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

      <Dialog open={showConfirmation} onClose={onCancelConfirmation}>
        <DialogTitle>Konfirmasi Penyimpanan</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menyimpan data mahasiswa ini?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCancelConfirmation}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            Batal
          </Button>
          <Button
            onClick={onConfirmSave}
            variant="contained"
            sx={{
              backgroundColor: "#c9a227",
              textTransform: "none",
              "&:hover": { backgroundColor: "#b48e1f" },
            }}
          >
            Ya, Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
