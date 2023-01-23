import axios, { AxiosInstance } from "axios";

export interface IHttpClientConfig {
  baseurl: string; // www.a.com, www.b.com, www.c.com
  headers: any | undefined; // accept:json, access_token
}

// tüm http işlemleri (fiilerini yürütüceğiz)
export interface IHttpClient {
  // enpoint api/users
  post<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse>; //{title:'a',body:'a'} // then cacth yada async await yapısı ile kullanıcam
  patch<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse>;

  put<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse>;

  delete<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse>;
  // TResponse => statusCode = 200, request.body.data // http post request body {id:1,name:ali}

  get<TResponse>(endpoint: string): Promise<TResponse>; // http get api/users?id=1
}

export default class HttpClient implements IHttpClient {
  private axios!: AxiosInstance; // undefined demek

  protected createAxiosClient(config: IHttpClientConfig): AxiosInstance {
    return axios.create({
      baseURL: config.baseurl,
      responseType: "json",
      headers: config.headers,
      timeout: 1000,
      timeoutErrorMessage: "Request Timeout",
    });
  }

  constructor(config: IHttpClientConfig) {
    this.axios = this.createAxiosClient(config);
  }

  // tüm post istekleri bu httpclient üzerinden yürür.
  async post<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.axios.post(endpoint, param);
      return response.data;
    } catch (error) {
      console.log("Axios Post Error", error);
    }

    return {} as TResponse;
  }

  patch<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse> {
    throw new Error("Method not implemented.");
  }
  put<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse> {
    throw new Error("Method not implemented.");
  }
  delete<TRequest, TResponse>(
    endpoint: string,
    param: TRequest
  ): Promise<TResponse> {
    throw new Error("Method not implemented.");
  }

  async get<TResponse>(endpoint: string): Promise<TResponse> {
    try {
      return (await this.axios.get<TResponse>(endpoint)).data;
    } catch (error) {
      console.log("api get error", error);
    }

    return {} as TResponse;
  }
}
