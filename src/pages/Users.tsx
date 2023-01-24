import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export default function Users({}: Props) {
  return (
    <div>
      Users
      <Outlet />
    </div>
  );
}
