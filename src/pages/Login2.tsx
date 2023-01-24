// React Forms Hook
// Formik %13 daha hızlı
// React Redux Forma göre %25
// Child Componenentler gereksiz render işlemleri yok
// Typescript uyumlu
// farklı yup gibi validayon kütüphaneleri ile çalışır
// UI Material UI ile uyumlu (Controller)

import * as yup from "yup";

export type LoginFormData = {
  email: string;
  password: string;
};

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};

export default function Login2({}: Props) {
  const schema = yup
    .object({
      email: yup
        .string()
        .required("email alanı boş geçilemez")
        .email("e-posta formatında olmalıdır"),
      password: yup
        .string()
        .required("Parola boş geçilemez")
        .max(15, "Maksimum 15 karakter uzunluğunda olmalıdır")
        .min(8, "Minimum 8 karakter uzunluğunda olmalıdır")
        .matches(/[a-z]/, "sayısal değer girilemez"),
    })
    .required();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    // formdatayı burada direk react hook formdan yakalayacağız
    console.log("data", data);
  };

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        {/* <input {...register("email", { required: true, max: 10, min: 20 })} /> */}
        <input {...register("email")} />
        <span style={{ color: "red" }}>{errors.email?.message}</span>

        {/* <input
          {...register("email", {
            required: {
              value: true,
              message: "boş geçilmez",
            },
            minLength: {
              value: 11,
              message: "This input must exceed 10 characters",
            },
            min: 20,
          })}
        /> */}
        {/* <span>{errors.email?.type != "required" ? "boş geçilemez" : ""}</span>
        <span>{errors.email? != "min" ? "min değer 10 karakter" : ""}</span> */}

        <br></br>
        <input {...register("password")} type="password" />
        <span>{errors.password?.message}</span>
        <br></br>
        <input type="submit" value="Oturum Aç" />
      </form>
    </div>
  );
}
