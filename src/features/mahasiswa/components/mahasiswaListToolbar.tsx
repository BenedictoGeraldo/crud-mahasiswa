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
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1f2937" }}>
            Daftar Mahasiswa
          </Typography>
        </Box>

        <Button
          component={Link}
          href="/mahasiswa/create"
          variant="contained"
          sx={{
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

      <TextField
        label="Cari berdasarkan NIM atau Email"
        value={queryInput}
        onChange={(e) => onChangeQuery(e.target.value)}
        fullWidth
        size="small"
      />
    </Stack>
  );
}
