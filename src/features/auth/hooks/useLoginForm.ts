"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/features/auth/services/auth.service";
import {
  loginSchema,
  type LoginSchema,
} from "@/features/auth/schemas/login.schema";
import { setAuthToken } from "@/lib/axios/client";
import { useAuthStore } from "@/stores";

type ApiLikeError = {
  message?: string;
};

export function useLoginForm() {
  const router = useRouter();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const [formError, setFormError] = useState("");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setFormError("");

      const response = await login(values);
      setAuthToken(response.token);
      setLoggedIn(true);

      router.push("/mahasiswa");
    } catch (error: unknown) {
      const apiError = error as ApiLikeError;
      setFormError(apiError.message ?? "Login gagal. Silahkan coba lagi");
    }
  });

  return {
    form,
    formError,
    onSubmit,
  };
}
