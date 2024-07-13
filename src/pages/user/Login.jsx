import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../api/atoms/authAtom"; // Recoil 상태 불러오기
import { postUserLogin } from "../../api/auth";
import Submit from "@components/Submit";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("u1@market.com");
  const [password, setPassword] = useState("11111111");
  const [emailError, setEmailError] = useState(""); // *추가: 이메일 오류 메시지 상태
  const [passwordError, setPasswordError] = useState(""); // *추가: 비밀번호 오류 메시지 상태
  const setAuthState = useSetRecoilState(authState); // Recoil 상태 업데이트 함수 가져오기
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError(""); // *추가: 오류 메시지 초기화
    setPasswordError(""); // *추가: 오류 메시지 초기화

    try {
      const response = await postUserLogin(email, password);
      console.log(response); // 서버 응답 확인
      if (response.status === 200) {
        const token = response.data.item.token;
        const username = response.data.item.name; // *변경: 사용자 이름 추가
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);
        setAuthState({ isAuthenticated: true, username }); // *변경: 로그인 상태 업데이트
        navigate('/');
      } else {
        handleErrors(response); // *추가: 오류 처리 함수 호출
      }
    } catch (error) {
      console.error(error); // 오류 출력
      handleErrors(error.response); // *추가: 오류 처리 함수 호출
    }
  };

  const handleErrors = (response) => {
    if (response.status === 403) {
      setEmailError("잘못된 이메일 주소입니다. 이메일 주소를 확인하세요."); // *변경: 이메일 오류 메시지 설정
    } else if (response.status === 422) {
      setPasswordError("잘못된 비밀번호입니다. 비밀번호를 확인하세요."); // *변경: 비밀번호 오류 메시지 설정
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">로그인</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            {emailError && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{emailError}</p>} {/* *추가: 이메일 오류 메시지 표시 */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            {passwordError && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{passwordError}</p>} {/* *추가: 비밀번호 오류 메시지 표시 */}
            <Link to="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link to="/user/signup" className="ml-8 text-gray-800 hover:underline">회원가입</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
