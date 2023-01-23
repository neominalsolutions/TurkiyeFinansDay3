import { AxiosHeaders } from "axios";
import { IHttpClient } from "./HttpClient";
import { HttpClientFactory } from "./HttpClientFactory";

export interface User {
  name: string;
  username: string;
  email: string;
}

export interface IUserClient {
  getAllUsers(): Promise<User[]>;
  getByUserId(id: number): Promise<User>;
  getByEmail(email: string): Promise<User>;
}

export class UserClient implements IUserClient {
  httpClient!: IHttpClient;

  constructor() {
    this.httpClient = HttpClientFactory.Instance({
      baseurl: "https://jsonplaceholder.typicode.com",
      headers: new AxiosHeaders(),
    });
  }

  getByEmail(email: string): Promise<User> {
    return this.httpClient.get<User>(`users?email=${email}`);
  }

  getAllUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>(`users`);
  }

  getByUserId(id: number): Promise<User> {
    return this.httpClient.get<User>(`users?id=${id}`);
  }
}
