import HttpClient, { IHttpClientConfig } from "./HttpClient";

// Not: Typescript de static classlar static keyword almaz.
export class HttpClientFactory {
  static Instance(config: IHttpClientConfig) {
    return new HttpClient({
      baseurl: config.baseurl,
      headers: config.headers,
    });
  }
}
