// httpClientInterface
// baseURL 지정, Auth 넣는 일 담당
// fetch(endPoint, options): Promise<Response>

export class HttpClient {
  constructor(baseURL, tokenRepository) {
    this.baseURL = baseURL;
    this.tokenRepository = tokenRepository;
  }

  fetch(url, options = {}) {
    return window.fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        Content_Type: "application/json",
        Authorization: this.tokenRepository.get(),
        ...options.headers,
      },
    });
  }
}
