import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactElement; // yönlenecek olan sayfadaki component
};

// React.ReactNode kullandımızda bir parent component içerisine birden fazla JSX element tanımlıyabiliyor. Single node bir element ile çalışacak ise ReactElement yazmamız yeterli olacaktır.

// C# daki Authorize Attribute Tanımı yaptık.
export default function LoginGuard({ children }: Props) {
  let isAuthenticated = false;
  let location = useLocation();

  console.log("location", location);

  const token = localStorage.getItem("accessToken");

  if (token != undefined) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.state }}></Navigate>;
  }

  return children;
}
