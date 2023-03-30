// AuthContext : authService의 함수를 컴포넌트에게 전달하는 역할
// signin, signup, logout 전달할 수 있는 형태면 됨
import { createContext, useContext } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// provider에서 필요한 authService도 props로 주입받는다
export function AuthProvider({ children, authService }) {
  const signin = authService.signin.bind(authService); // 이벤트핸들러에서 실행시 this가 AuthService인스턴스가 아닌 윈도우가 되므로 authService로 바인딩한다 (authService 메서드에서 this.httpClient 처럼 this를 사용하고 있음)
  const signup = authService.signup.bind(authService);
  const logout = authService.logout.bind(authService);

  return (
    <AuthContext.Provider value={{ signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
