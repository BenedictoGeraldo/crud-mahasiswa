import { Avatar, Box, Stack, Typography } from "@mui/material";
import type { UserProfile } from "@/features/profile/types/profile.type";

function getAvatarInitial(name?: string): string {
  const trimmed = name?.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "U";
}

type ProfileIdentityProps = {
  profile: UserProfile;
};

export function ProfileIdentity({ profile }: ProfileIdentityProps) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Avatar
        sx={{
          width: 44,
          height: 44,
          bgcolor: "#c9a227",
          color: "#fff",
          fontWeight: 700,
        }}
      >
        {getAvatarInitial(profile.name)}
      </Avatar>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}
        >
          {profile.name || "User"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280" }}>
          {profile.email}
        </Typography>
      </Box>
    </Stack>
  );
}
