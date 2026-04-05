"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { useProfileForm } from "@/features/profile/hooks/useProfileForm";
import { ProfileHeader } from "@/features/profile/components/profileHeader";
import { ProfileIdentity } from "@/features/profile/components/profileIdentity";
import { ProfileReadInfo } from "@/features/profile/components/profileReadInfo";
import { ProfileEditForm } from "@/features/profile/components/profileEditForm";

export function ProfileView() {
  const {
    form,
    profile,
    loading,
    hasProfile,
    errorMessage,
    successMessage,
    isEditMode,
    toggleEditMode,
    cancelEditMode,
    onSubmit,
  } = useProfileForm();

  return (
    <main className="px-4 pb-8 pt-3 md:px-6 md:pb-10">
      <Box className="mx-auto w-full max-w-3xl">
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: "1px solid #dccfa8",
            backgroundColor: "#f8f6f1",
            p: { xs: 2.5, md: 3 },
          }}
        >
          <ProfileHeader
            loading={loading}
            hasProfile={hasProfile}
            isEditMode={isEditMode}
            onToggleEditMode={toggleEditMode}
          />

          <Divider sx={{ my: 2.5 }} />

          {loading ? (
            <Box className="flex items-center justify-center py-12">
              <CircularProgress />
            </Box>
          ) : null}

          {!loading && errorMessage ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}

          {!loading && successMessage ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          ) : null}

          {!loading && hasProfile && profile ? (
            <Stack spacing={2.5}>
              <ProfileIdentity profile={profile} />

              {isEditMode ? (
                <ProfileEditForm
                  form={form}
                  onSubmit={onSubmit}
                  onCancel={cancelEditMode}
                />
              ) : (
                <ProfileReadInfo profile={profile} />
              )}
            </Stack>
          ) : null}
        </Paper>
      </Box>
    </main>
  );
}
