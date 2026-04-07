"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Popover,
  Stack,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState, type MouseEvent } from "react";
import { useAuthStore, useProfileStore } from "@/stores";

export function DashboardNavbar() {
  const router = useRouter();
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const logout = useAuthStore((state) => state.logout);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
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
  const menuOpen = Boolean(menuAnchor);

  const handleLogout = () => {
    setMenuAnchor(null);
    logout();
    clearProfileState();
    router.replace("/login");
  };

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleGoProfile = () => {
    setMenuAnchor(null);
    router.push("/profile");
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6">
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "18px",
          zIndex: 39,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(239, 237, 232, 0.45)",
          WebkitBackdropFilter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <Paper
        elevation={0}
        sx={{
          borderRadius: "25px",
          border: "2px solid #dccfa8",
          backgroundColor: "rgba(248, 246, 241, 0.76)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          minHeight: { xs: 65, sm: 80 },
          width: { xs: "100%", sm: "94%", md: "90%", lg: "86%" },
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 1.2, sm: 1.5 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          marginX={{ xs: 0.4, sm: 2.2 }}
          spacing={2}
        >
          <Link href="/mahasiswa" className="flex items-center gap-3">
            <Stack direction="row" alignItems="center" spacing={1.2}>
              <Typography
                variant="h4"
                sx={{
                  color: "#8f6f16",
                  fontWeight: 900,
                  letterSpacing: 0.6,
                  lineHeight: 1,
                }}
              >
                SIMM
              </Typography>
            </Stack>
          </Link>

          <Stack direction="row" spacing={1.2} alignItems="center">
            {loadingProfile ? (
              <CircularProgress size={20} />
            ) : (
              <Box>
                <IconButton
                  onMouseEnter={handleOpenMenu}
                  onClick={handleOpenMenu}
                  sx={{
                    p: 0.4,
                    width: 36,
                    height: 36,
                    fontSize: 14,
                    bgcolor: "#c9a227",
                    color: "#fff",
                    border: "2px solid #fff",
                  }}
                >
                  {avatarText}
                </IconButton>

                <Popover
                  open={menuOpen}
                  anchorEl={menuAnchor}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  disableRestoreFocus
                  PaperProps={{
                    onMouseLeave: handleCloseMenu,
                    sx: {
                      mt: 1,
                      minWidth: 220,
                      borderRadius: "12px",
                      border: "1px solid #e4dcc2",
                      p: 1,
                      backgroundColor: "#fffdf8",
                    },
                  }}
                >
                  <Box sx={{ px: 1, py: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#1f2937" }}
                    >
                      {displayName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>
                      {displayEmail}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Stack spacing={0.5}>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={handleGoProfile}
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        color: "#1f2937",
                        px: 1,
                      }}
                    >
                      Lihat Profil
                    </Button>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={handleLogout}
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        color: "#b42318",
                        px: 1,
                      }}
                    >
                      Keluar
                    </Button>
                  </Stack>
                </Popover>
              </Box>
            )}
          </Stack>
        </Stack>
      </Paper>
    </header>
  );
}
