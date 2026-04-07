"use client";

import { TextField, Button, MenuItem, Alert, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  MahasiswaSchema,
  jurusanOptions,
} from "@/features/mahasiswa/schemas/mahasiswa.schema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const textFieldSx = {
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
  "& .MuiInputBase-root": {
    borderRadius: "10px",
  },
  "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#c9a227",
    borderWidth: "2px",
  },
};

interface MahasiswaFormProps {
  form: UseFormReturn<MahasiswaSchema>;
  onSubmit: (data: MahasiswaSchema) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function MahasiswaForm({
  form,
  onSubmit,
  isLoading = false,
  error,
}: MahasiswaFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const tanggalLahirValue = watch("tanggal_lahir");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error ? <Alert severity="error">{error}</Alert> : null}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="NIM"
            placeholder="Contoh: 2024001"
            {...register("nim")}
            error={!!errors.nim}
            helperText={errors.nim?.message}
            disabled={isLoading}
            sx={textFieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            {...register("nama")}
            error={!!errors.nama}
            helperText={errors.nama?.message}
            disabled={isLoading}
            sx={textFieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="nama@example.com"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isLoading}
            sx={textFieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="jurusan"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                select
                label="Jurusan"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={!!errors.jurusan}
                helperText={errors.jurusan?.message}
                disabled={isLoading}
                sx={textFieldSx}
              >
                <MenuItem value="">Pilih Jurusan</MenuItem>
                {jurusanOptions.map((jurusan) => (
                  <MenuItem key={jurusan} value={jurusan}>
                    {jurusan}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Tanggal Lahir"
              format="YYYY-MM-DD"
              value={tanggalLahirValue ? dayjs(tanggalLahirValue) : null}
              onChange={(date) => {
                setValue(
                  "tanggal_lahir",
                  date ? date.format("YYYY-MM-DD") : "",
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                );
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.tanggal_lahir,
                  helperText: errors.tanggal_lahir?.message,
                  disabled: isLoading,
                  sx: textFieldSx,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Box className="flex gap-3 pt-4">
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{
            backgroundColor: "#c9a227",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#b48e1f" },
          }}
        >
          {isLoading ? "Menyimpan..." : "Simpan"}
        </Button>

        <Button
          variant="outlined"
          type="button"
          onClick={() => window.history.back()}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
          }}
        >
          Batal
        </Button>
      </Box>
    </form>
  );
}
