import { Button, Stack, TextField } from "@mui/material";
import type { UseFormReturn } from "react-hook-form";
import type { ProfileSchema } from "@/features/profile/schemas/profile.schema";

const primaryButtonSx = {
  textTransform: "none",
  fontWeight: 600,
  backgroundColor: "#c9a227",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#b48e1f",
    boxShadow: "none",
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        fullWidth
        label="Nama"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        disabled={isSubmitting}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={isSubmitting}
      />

      <Stack direction="row" spacing={1.2}>
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
        >
          Batal
        </Button>
      </Stack>
    </form>
  );
}