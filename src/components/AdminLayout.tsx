import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export default function AdminLayout({}: Props) {
  return (
    <div>
      AdminLayout
      {/* burada componentlerin doma dinamik olarak girip çıkmasını outlet sağlar */}
      <Outlet />
    </div>
  );
}
