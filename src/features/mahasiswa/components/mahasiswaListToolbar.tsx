"use client";

import Link from "next/link";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

type Props = {
  queryInput: string;
  onChangeQuery: (value: string) => void;
};

export function MahasiswaListToolbar({ queryInput, onChangeQuery }: Props) {
  return (
    <Stack gap={2} mb={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={2}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1f2937" }}>
            Daftar Mahasiswa
          </Typography>
        </Box>

        <Button
          component={Link}
          href="/mahasiswa/create"
          variant="contained"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            alignSelf: "stretch",
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "12px",
            backgroundColor: "#c9a227",
            "&:hover": { backgroundColor: "#b48e1f" },
          }}
        >
          Tambah Mahasiswa
        </Button>
      </Stack>

      <Button
        component={Link}
        href="/mahasiswa/create"
        variant="contained"
        sx={{
          display: { xs: "none", sm: "inline-flex" },
          alignSelf: "flex-end",
          textTransform: "none",
          fontWeight: 700,
          borderRadius: "12px",
          backgroundColor: "#c9a227",
          "&:hover": { backgroundColor: "#b48e1f" },
        }}
      >
        Tambah Mahasiswa
      </Button>

      <TextField
        placeholder="Cari berdasarkan NIM atau Email..."
        value={queryInput}
        onChange={(e) => onChangeQuery(e.target.value)}
        fullWidth
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c9a227",
              borderWidth: "2px",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "0.82rem",
            opacity: 1,
            color: "#a1a1a3",
          },
        }}
      />
    </Stack>
  );
}
