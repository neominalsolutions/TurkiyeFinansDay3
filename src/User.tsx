import { AxiosHeaders } from "axios";
import React, { useEffect } from "react";
import HttpClient from "./network/HttpClient";
import { HttpClientFactory } from "./network/HttpClientFactory";
import { UserClient } from "./network/UserClient";

type Props = {};

export default function User({}: Props) {
  const loadUsers = async () => {
    let header = new AxiosHeaders();
    header = header.set("Authorization", "Bearer <access_token>");

    const client = HttpClientFactory.Instance({
      baseurl: "https://jsonplaceholder.typicode.com",
      headers: header,
    });

    let response = await client.get("users");
    console.log("response2", response);
  };

  const loadUserFormUserClient = async () => {
    const client = new UserClient();
    client
      .getByEmail("test@test.com")
      .then((response) => {})
      .catch()
      .finally();

    try {
      let response = await client.getByUserId(1);
    } catch (error) {}
  };

  const loadUsersPromise = () => {
    let header = new AxiosHeaders();
    header = header.set("Authorization", "Bearer <access_token>");

    const client = new HttpClient({
      baseurl: "https://jsonplaceholder.typicode.com",
      headers: header,
    });

    client
      .get("users")
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadUsersPromise();
  });

  return <div>User</div>;
}
