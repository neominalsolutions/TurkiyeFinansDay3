import React from "react";
import { Link, Outlet } from "react-router-dom";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div>
      <header>
        <h1>Üst Bilgi</h1>
        <nav>
          <Link to="home">Home Page</Link> &nbsp;
          <Link to="about">About Page</Link> &nbsp;
          <Link to="admin">Admin Page</Link> &nbsp;
          <Link to="login">Oturum Aç</Link> &nbsp;
        </nav>
      </header>

      <main>
        <Outlet />
        {/* renderbody */}
      </main>

      <footer>Alt Bilgi</footer>
    </div>
  );
}
