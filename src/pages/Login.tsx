import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const submit = (event: any) => {
    console.log("event", event);
    event.preventDefault(); // uygulama scope kalmak form gönderim işlemlerini durdururz sayfa yenilenmez.

    axios
      .post("https://reqres.in/api/login", user)
      .then((response) => {
        // yönlendir
        console.log("response", response);
        localStorage.setItem("accessToken", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div>
      <form method="post" onSubmit={() => submit(event)}>
        <input
          onChange={(event) => {
            console.log("event", event.target.value);

            setUser({ ...user, email: event.target.value });
          }}
          value={user.email}
          name="email"
        />
        <span style={{ color: "red" }}>
          {!user.email && <span>Email alanı gerekli</span>}
        </span>
        <br></br>
        <input
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
          value={user.password}
          name="password"
          type="password"
        />
        <br></br>
        <input type="submit" value="Oturum Aç" />
      </form>
    </div>
  );
}
