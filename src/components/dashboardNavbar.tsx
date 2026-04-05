"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useAuthStore, useProfileStore } from "@/stores";

export function DashboardNavbar() {
  const router = useRouter();
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const logout = useAuthStore((state) => state.logout);
  const {
    profile,
    loading: loadingProfile,
    loadProfile,
    clearProfileState,
  } = useProfileStore();

  useEffect(() => {
    hydrateAuth();
    void loadProfile();
  }, [hydrateAuth, loadProfile]);

  const avatarText = profile?.name?.trim().charAt(0).toUpperCase() || "U";

  const displayName = profile?.name || "User";
  const displayEmail = profile?.email || "";

  const handleLogout = () => {
    logout();
    clearProfileState();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6">
      <Paper
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #dccfa8",
          backgroundColor: "#f8f6f1",
          px: { xs: 2, md: 3 },
          py: 1.5,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Link href="/mahasiswa" className="flex items-center gap-3">
            <Image src="/logo.png" alt="SIMM Logo" width={34} height={34} />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#1f2937", lineHeight: 1.1 }}
              >
                SIMM
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280" }}>
                Sistem Informasi Mahasiswa
              </Typography>
            </Box>
          </Link>

          <Stack direction="row" spacing={1.2} alignItems="center">
            {loadingProfile ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Button
                  variant="text"
                  onClick={() => router.push("/profile")}
                  sx={{
                    textTransform: "none",
                    color: "#1f2937",
                    px: 1,
                    minWidth: 0,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        fontSize: 13,
                        bgcolor: "#c9a227",
                        color: "#fff",
                      }}
                    >
                      {avatarText}
                    </Avatar>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, lineHeight: 1.1 }}
                      >
                        {displayName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#6b7280", lineHeight: 1.1 }}
                      >
                        {displayEmail}
                      </Typography>
                    </Box>
                  </Stack>
                </Button>

                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: "#c9a227",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#b48e1f",
                      boxShadow: "none",
                    },
                  }}
                >
                  Keluar
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Paper>
    </header>
  );
}
