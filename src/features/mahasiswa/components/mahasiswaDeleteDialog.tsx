"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { Mahasiswa } from "@/features/mahasiswa/types/mahasiswa.type";

type Props = {
  selectedDelete: Mahasiswa | null;
  deleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function MahasiswaDeleteDialog({
  selectedDelete,
  deleting,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={Boolean(selectedDelete)} onClose={onClose}>
      <DialogTitle>Hapus Data Mahasiswa</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Yakin inging menghapus data {selectedDelete?.nama} (
          {selectedDelete?.nim})?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={deleting}
          sx={{ textTransform: "none" }}
        >
          Batal
        </Button>
        <Button
          onClick={onConfirm}
          disabled={deleting}
          color="error"
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          {deleting ? "Menghapus..." : "Hapus"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
