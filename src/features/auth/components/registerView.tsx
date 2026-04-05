"use client";

import { Paper } from "@mui/material";
import { LoginIllustration } from "./loginIllustration";
import { RegisterFormCard } from "./registerFormCard";

export function RegisterView() {
  return (
    <main className="min-h-screen bg-[#efede8]">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
        <Paper
          elevation={0}
          className="w-full overflow-hidden rounded-3xl border border-[#dccfa8]"
          sx={{ backgroundColor: "#f8f6f1" }}
        >
          <div className="grid min-h-170 grid-cols-1 lg:grid-cols-2">
            <LoginIllustration />
            <RegisterFormCard />
          </div>
        </Paper>
      </div>
    </main>
  );
}
