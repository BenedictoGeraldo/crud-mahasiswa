"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegisterForm } from "../hooks/useRegisterForm";

const authInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#b48e1f",
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#8f6f16",
  },
};

export function RegisterFormCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { form, formError, formSuccess, onSubmit } = useRegisterForm();

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <section className="flex items-center justify-center px-5 py-10 sm:px-10">
      <Box className="w-full max-w-md">
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#1f2937", mb: 1 }}
        >
          Register
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 550, color: "#6b7280", mb: 3 }}
        >
          Buat akun untuk mengakses SIMM.
        </Typography>

        {formError ? (
          <Alert severity="error" sx={{ mb: 1 }}>
            {formError}
          </Alert>
        ) : null}

        {formSuccess ? (
          <Alert severity="success" sx={{ mb: 1 }}>
            {formSuccess}
          </Alert>
        ) : null}

        <form onSubmit={onSubmit} noValidate>
          <TextField
            label="Nama Lengkap"
            fullWidth
            margin="normal"
            sx={authInputSx}
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            sx={authInputSx}
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            sx={authInputSx}
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Konfirmasi Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            sx={authInputSx}
            {...register("confirmPassword")}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "12px",
              backgroundColor: "#c9a227",
              color: "#fff",
              "&:hover": { backgroundColor: "#b48e1f" },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Daftar"
            )}
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ color: "#6b7280", textAlign: "center", mt: 3 }}
        >
          Sudah punya akun? {""}
          <Link
            href="/login"
            className="font-semibold text-[#8f6f16] hover:underline"
          >
            Login
          </Link>
        </Typography>
      </Box>
    </section>
  );
}
