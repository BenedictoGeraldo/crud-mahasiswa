import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { UseFormReturn } from "react-hook-form";
import type { ProfileSchema } from "@/features/profile/schemas/profile.schema";

const primaryButtonSx = {
  textTransform: "none",
  fontWeight: 700,
  borderRadius: "12px",
  fontSize: { xs: "0.84rem", sm: "0.95rem" },
  minHeight: { xs: 36, sm: 42 },
  px: { xs: 1.8, sm: 2.4 },
  py: { xs: 0.5, sm: 0.85 },
  backgroundColor: "#c9a227",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#b48e1f",
    boxShadow: "none",
  },
};

const profileInputSx = {
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#111827",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c9a227",
      borderWidth: "2px",
    },
  },
};

type ProfileEditFormProps = {
  form: UseFormReturn<ProfileSchema>;
  onSubmit: (data: ProfileSchema) => Promise<void>;
  onCancel: () => void;
};

export function ProfileEditForm({
  form,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<ProfileSchema | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  const handleFormSubmit = (data: ProfileSchema) => {
    if (!isDirty) {
      return;
    }

    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmSave = async () => {
    if (!pendingData) return;
    await onSubmit(pendingData);
    setShowConfirmDialog(false);
    setPendingData(null);
  };

  const handleCancelSave = () => {
    setShowConfirmDialog(false);
    setPendingData(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          fullWidth
          label="Nama"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isSubmitting}
          sx={{ ...profileInputSx, my: 1.2 }}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isSubmitting}
          sx={{ ...profileInputSx, my: 1.2 }}
        />

        <Stack direction="row" spacing={{ xs: 1.2, sm: 2 }} sx={{ pt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={primaryButtonSx}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={isSubmitting}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: { xs: "0.84rem", sm: "0.95rem" },
              minHeight: { xs: 36, sm: 42 },
              px: { xs: 1.6, sm: 2.2 },
              py: { xs: 0.5, sm: 0.85 },
            }}
          >
            Batal
          </Button>
        </Stack>
      </form>

      <Dialog open={showConfirmDialog} onClose={handleCancelSave}>
        <DialogTitle>Konfirmasi Penyimpanan</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menyimpan perubahan data profil ini?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelSave}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              minHeight: { xs: 32, sm: 36 },
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              void handleConfirmSave();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#c9a227",
              textTransform: "none",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              minHeight: { xs: 32, sm: 36 },
              "&:hover": { backgroundColor: "#b48e1f" },
            }}
          >
            Ya, Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
