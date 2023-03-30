import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { HttpClient } from "./httpClient/httpClient";
import { AuthService } from "./service/AuthService";
import { LocalTokenRepository } from "./repository/LocalTokenRepository";

const root = ReactDOM.createRoot(document.getElementById("root"));

// bootstraping : 시동, 앱 시작에 필요한 준비
// 의존성주입, 의존성 조합 처리 => App.js에서 해도 되지만, 맨 처음 필요한 작업이므로 index.js에서 처리
const localTokenRepository = new LocalTokenRepository();
const httpClient = new HttpClient(
  process.env.REACT_APP_BASE_URL,
  localTokenRepository
);

const authService = new AuthService(httpClient, localTokenRepository);
root.render(
  <AuthProvider authService={authService}>
    <App />
  </AuthProvider>
);
