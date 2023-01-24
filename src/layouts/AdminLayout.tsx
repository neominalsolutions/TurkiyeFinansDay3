import React from "react";
import { Link, Outlet } from "react-router-dom";

type Props = {};

export default function AdminLayout({}: Props) {
  const users = [
    { id: 1, name: "ali" },
    { id: 2, name: "can" },
  ];

  return (
    <div>
      <h1> AdminLayout </h1>
      <nav>
        <Link to="users">Users Page</Link>
        &nbsp;
        <Link to="users/rejected">Recjected Users</Link>
        <h1>Route Data</h1>
        {users.map((item) => {
          return (
            <div key={item.id}>
              <br></br>
              <Link to={`user-detail/${item.id}/${item.name}`}>
                {item.name} detay
              </Link>
              <br></br>
            </div>
          );
        })}
        <h1>Query String</h1>
        {users.map((item) => {
          return (
            <div key={item.id}>
              <br></br>
              <Link to={`user-detail?id=${item.id}&name=${item.name}`}>
                {item.name} detay
              </Link>
              <br></br>
            </div>
          );
        })}
      </nav>

      {/* burada componentlerin doma dinamik olarak girip çıkmasını outlet sağlar */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
