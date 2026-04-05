"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserProfile } from "@/features/profile/types/profile.type";
import {
  profileSchema,
  type ProfileSchema,
} from "@/features/profile/schemas/profile.schema";
import { useProfileStore } from "@/stores";

type UseProfileFormResult = {
  form: ReturnType<typeof useForm<ProfileSchema>>;
  profile: UserProfile | null;
  loading: boolean;
  hasProfile: boolean;
  errorMessage: string;
  successMessage: string;
  isEditMode: boolean;
  toggleEditMode: () => void;
  cancelEditMode: () => void;
  onSubmit: (data: ProfileSchema) => Promise<void>;
};

export function useProfileForm(): UseProfileFormResult {
  const {
    profile,
    loading,
    errorMessage,
    successMessage,
    isEditMode,
    loadProfile,
    saveProfile,
    toggleEditMode,
    cancelEditMode: cancelEditModeStore,
  } = useProfileStore();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (!profile) return;
    form.reset({
      name: profile.name ?? "",
      email: profile.email,
    });
  }, [profile, form]);

  const cancelEditMode = () => {
    if (profile) {
      form.reset({
        name: profile.name ?? "",
        email: profile.email,
      });
    }
    cancelEditModeStore();
  };

  const onSubmit = async (values: ProfileSchema) => {
    await saveProfile(values);
  };

  return {
    form,
    profile,
    loading,
    hasProfile: !!profile,
    errorMessage,
    successMessage,
    isEditMode,
    toggleEditMode,
    cancelEditMode,
    onSubmit,
  };
}
