import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../../api/atoms/authAtom';
import Button from './../Button';

// AuthState 인터페이스 정의
interface AuthState {
  isAuthenticated: boolean;
  username?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState<AuthState>(authState);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth({ isAuthenticated: false });
    navigate('/');
  };

  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <img className="mr-3 h-6 sm:h-9" src="/images/favicon.svg" alt="로고 이미지" />
            <span className="text-lg font-bold">멋사컴</span>
          </Link>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold"><Link to="/info">정보공유</Link></li>
            <li className="hover:text-amber-500 hover:font-semibold"><Link to="/free">자유게시판</Link></li>
            <li className="hover:text-amber-500 a:font-semibold"><Link to="/qna">질문게시판</Link></li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {auth.isAuthenticated ? (
            <div className="flex items-center">
              <img className="w-8 rounded-full mr-2" src="https://api.fesp.shop/files/00-sample/user-muzi.webp" alt="프로필 이미지" />
              <span>{auth.username}님 :)</span>
              <Button size="md" bgColor="gray" onClick={handleLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button size="sm" onClick={() => navigate(`/user/login`)}>로그인</Button>
              <Button size="sm" bgColor="gray" onClick={() => navigate(`/user/signup`)}>회원가입</Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
