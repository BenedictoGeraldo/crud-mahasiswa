import { create } from "zustand";
import {
  getProfile,
  updateProfile,
} from "@/features/profile/services/profile.service";
import type { ProfileSchema } from "@/features/profile/schemas/profile.schema";
import type { UserProfile } from "@/features/profile/types/profile.type";

type ProfileStoreState = {
  profile: UserProfile | null;
  loading: boolean;
  errorMessage: string;
  successMessage: string;
  isEditMode: boolean;
};

type ProfileStoreActions = {
  loadProfile: () => Promise<void>;
  saveProfile: (values: ProfileSchema) => Promise<void>;
  toggleEditMode: () => void;
  cancelEditMode: () => void;
  clearProfileState: () => void;
};

type ProfileStore = ProfileStoreState & ProfileStoreActions;

function toErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

const initialState: ProfileStoreState = {
  profile: null,
  loading: false,
  errorMessage: "",
  successMessage: "",
  isEditMode: false,
};

export const useProfileStore = create<ProfileStore>((set) => ({
  ...initialState,

  async loadProfile() {
    try {
      set({ loading: true, errorMessage: "" });
      const data = await getProfile();
      set({ profile: data });
    } catch (error: unknown) {
      set({
        profile: null,
        errorMessage: toErrorMessage(error, "Gagal memuat profil."),
      });
    } finally {
      set({ loading: false });
    }
  },

  async saveProfile(values: ProfileSchema) {
    try {
      set({ errorMessage: "", successMessage: "" });
      const updated = await updateProfile(values);
      set({
        profile: updated,
        isEditMode: false,
        successMessage: "Profil berhasil diperbarui.",
      });
    } catch (error: unknown) {
      const errorMessage = toErrorMessage(error, "Gagal memperbarui profil.");
      set({ errorMessage });
      throw new Error(errorMessage);
    }
  },

  toggleEditMode() {
    set((state) => ({
      isEditMode: !state.isEditMode,
      successMessage: "",
    }));
  },

  cancelEditMode() {
    set({ isEditMode: false, errorMessage: "", successMessage: "" });
  },

  clearProfileState() {
    set({ ...initialState });
  },
}));
