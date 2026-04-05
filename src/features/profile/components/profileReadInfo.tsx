import { Box, Typography } from "@mui/material";
import type { UserProfile } from "@/features/profile/types/profile.type";

function formatRegisterDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: "#6b7280" }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: "#1f2937", fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

type ProfileReadInfoProps = {
  profile: UserProfile;
};

export function ProfileReadInfo({ profile }: ProfileReadInfoProps) {
  return (
    <>
      <ProfileField label="ID User" value={String(profile.id)} />
      <ProfileField
        label="Status Akun"
        value={profile.is_active ? "Aktif" : "Tidak Aktif"}
      />
      <ProfileField
        label="Tanggal Registrasi"
        value={formatRegisterDate(profile.register_date)}
      />
    </>
  );
}
