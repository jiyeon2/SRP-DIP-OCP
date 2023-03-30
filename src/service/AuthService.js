// AuthServiceInterface 에 필요한 기능을 추상적으로 정의
// signin(email, password): Promise<void> // 회원가입은 비동기 요청이므로 Promise형태를 리턴한다
// signup(email, password): Promise<void>
// logout(): void

export class AuthService {
  // 생성 시 httpClient, tokenRepository 주입받아서 쓴다
  constructor(httpClient, tokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async signin(email, password) {
    // 구체적인 코드가 들어간다
    // email, password 받아서

    // api 요청 => authService 담당이 아님. api 요청, 통신 담당을 만든다. => 구체말고 추상화된 interface만 보고 가져다 쓴다
    const result = await this.httpClient.fetch("auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const { access_token } = await result.json();
    // 받아온 토큰을 tokenRepository에 저장한다 => 토큰 관리하는 모듈도 만든다, 인터페이스만 보고 가져다 쓴다
    this.tokenRepository.save(access_token);
  }

  async signup(email, password) {
    const response = await this.httpClient.fetch("auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // reponse.statusCode !== 201 이면
    if (!response.ok) {
      throw response;
    }
  }

  async logout() {
    this.tokenRepository.remove();
  }
}
