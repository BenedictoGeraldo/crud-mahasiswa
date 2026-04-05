import { Box, Button, Stack, Typography } from "@mui/material";

const primaryButtonSx = {
  textTransform: "none",
  fontWeight: 600,
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
          Informasi akun pengguna yang sedang login.
        </Typography>
      </Box>

      {!loading && hasProfile ? (
        <Button
          variant={isEditMode ? "outlined" : "contained"}
          onClick={onToggleEditMode}
          sx={isEditMode ? undefined : primaryButtonSx}
        >
          {isEditMode ? "Tutup Edit" : "Edit Profil"}
        </Button>
      ) : null}
    </Stack>
  );
}
