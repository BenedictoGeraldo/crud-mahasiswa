"use client";

import Image from "next/image";
import { Typography } from "@mui/material";

export function LoginIllustration() {
  return (
    <section className="relative hidden lg:block bg-[#f2e7cc]">
      <div className="absolute inset-0 bg-linear-to-br from-[#f5ebd1] via-[#f2e7cc] to-[#e9d9ac]" />
      <div className="relative h-full p-8">
        <Typography
          variant="h5"
          sx={{ color: "#8f6f16", fontWeight: 800, letterSpacing: 0.4 }}
        >
          SIMM
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "#6b7280", mt: 1, maxWidth: 360 }}
        >
          Sistem Informasi Manajemen Mahasiswa
        </Typography>

        <div className="relative mt-8 h-130 w-full">
          <Image
            src="/college-class-amico.svg"
            alt="Ilustrasi kelas mahasiswa"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
