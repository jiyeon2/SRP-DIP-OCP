import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// 이 모듈에서 처리할 관심사 : ui rendering, state management (ui 라이브러리인 react의 관심사)

function Auth() {
  // const authService = new AuthService(); // 이렇게 쓰면 Auth 컴포넌트에서 AuthService에 대한 직접적인 의존성 가지고 있는 상태가 됨
  // context api 사용하여 이 컴포넌트에서 필요한 형태(Auth 컴포넌트에서 필요한 signin, signup, logout 형태)로 만들어 주입한다
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInputs;

  const saveUserInputs = ({ target }) => {
    const { name, value } = target;

    setUserInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    signin: signinService,
    signup: signupService,
    logout: logoutService,
  } = useAuth();

  const signin = () => {
    // state관리는 Auth 컴포넌트의 책임, signinService함수만 context에서 가져와서 state와 조합만 함
    console.log(email, password);
    signinService(email, password);
  };
  const signup = () => {
    signupService(email, password);
  };
  const logout = () => {
    logoutService();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>
          email
          <input value={email} name="email" onChange={saveUserInputs} />
        </label>
      </div>
      <div>
        <label>
          password
          <input value={password} name="password" onChange={saveUserInputs} />
        </label>
      </div>
      <button onClick={signin}>signin</button>
      <button onClick={signup}>signup</button>
      <button onClick={logout}>logout</button>
    </form>
  );
}

export default Auth;
