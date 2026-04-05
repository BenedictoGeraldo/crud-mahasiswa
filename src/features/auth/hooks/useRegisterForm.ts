"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerService } from "@/features/auth/services/auth.service";
import {
  registerSchema,
  type RegisterSchema,
} from "@/features/auth/schemas/register.schema";

type ApiLikeError = {
  message?: string;
};

export function useRegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setFormError("");
      setFormSuccess("");

      await registerService({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      setFormSuccess("Registrasi berhasil. Anda diarahkan ke halaman login...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: unknown) {
      const apiError = error as ApiLikeError;
      setFormError(apiError.message ?? "Registrasi gagal. Silahkan coba lagi");
    }
  });

  return {
    form,
    formError,
    formSuccess,
    onSubmit,
  };
}
