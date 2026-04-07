import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const primaryButtonSx = {
  textTransform: "none",
  fontWeight: 700,
  borderRadius: "12px",
  fontSize: { xs: "0.82rem", sm: "0.92rem" },
  minHeight: { xs: 34, sm: 40 },
  px: { xs: 1.5, sm: 2.25 },
  py: { xs: 0.45, sm: 0.7 },
  backgroundColor: "#c9a227",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#b48e1f",
    boxShadow: "none",
  },
};

type ProfileHeaderProps = {
  loading: boolean;
  hasProfile: boolean;
  isEditMode: boolean;
  onToggleEditMode: () => void;
};

export function ProfileHeader({
  loading,
  hasProfile,
  isEditMode,
  onToggleEditMode,
}: ProfileHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      spacing={1.5}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1f2937" }}>
          Profil Saya
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
          Lihat informasi akun anda.
        </Typography>
      </Box>

      {!loading && hasProfile ? (
        <Button
          variant={isEditMode ? "text" : "contained"}
          startIcon={
            isEditMode ? (
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
            ) : undefined
          }
          onClick={onToggleEditMode}
          sx={
            isEditMode
              ? {
                  textTransform: "none",
                  color: "#6b7280",
                  fontWeight: 600,
                  fontSize: { xs: "0.82rem", sm: "0.92rem" },
                  minHeight: { xs: 30, sm: 36 },
                  px: { xs: 0.25, sm: 0.5 },
                  py: { xs: 0.25, sm: 0.4 },
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#1f2937",
                  },
                }
              : primaryButtonSx
          }
        >
          {isEditMode ? "Kembali" : "Edit Profil"}
        </Button>
      ) : null}
    </Stack>
  );
}
