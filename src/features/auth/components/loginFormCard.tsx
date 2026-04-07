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
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

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

export function LoginFormCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, formError, onSubmit } = useLoginForm();

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
          Login
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 550, color: "#6b7280", mb: 4 }}
        >
          Masuk untuk mengelola data mahasiswa.
        </Typography>

        {formError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        ) : null}

        <form onSubmit={onSubmit} noValidate>
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
              "Masuk"
            )}
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ color: "#6b7280", textAlign: "center", mt: 3 }}
        >
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#8f6f16] hover:underline"
          >
            Daftar di sini
          </Link>
        </Typography>
      </Box>
    </section>
  );
}
