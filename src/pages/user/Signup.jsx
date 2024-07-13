import React, { useState } from 'react';
import Button from '@components/Button';
import Submit from '@components/Submit';
import defaultProfileImage from '../../../public/images/ProfileImage.png';

function Signup() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 추가
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // 비밀번호 확인 에러 상태 추가
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태

  // 이름 조건
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);

    if (/\d/.test(value)) {
      setNameError('이름을 올바르게 입력해주세요.');
    } else {
      setNameError('');
    }
  };

  // 이메일 조건
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 조건
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.'); // 비밀번호와 비밀번호 확인이 일치하는지 확인
    } else {
      setConfirmPasswordError('');
    }
  };

  // 비밀번호 확인 조건
  const handleConfirmPasswordChange = (event) => { //비밀번호 확인 조건 추가
    const value = event.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.'); //비밀번호와 비밀번호 확인이 일치하는지 확인
    } else {
      setConfirmPasswordError('');
    }
  };

  // 프로필 이미지 선택
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nameError) {
      alert('이름을 올바르게 입력해주세요.');
      return;
    }
    if (emailError) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return;
    }
    if (passwordError) {
      alert('비밀번호를 올바르게 입력해주세요. (8자 이상)');
      return;
    }
    if (confirmPasswordError) { // 비밀번호 확인 에러 체크
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  

  // 회원 정보 저장
  const profileImageToSave = profileImage || defaultProfileImage; // 기본 이미지 사용
  const userInfo = {
    name,
    email,
    password,
    profileImage: profileImageToSave,
  };

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(userInfo);
  localStorage.setItem('user', JSON.stringify(userInfo)); // 로컬 스토리지에 저장
  
  alert('회원가입이 완료되었습니다^^.')
};


  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">회원 가입</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{passwordError}</p>}
          </div>
          <div className="mb-4"> {/* 비밀번호 확인 입력창 추가 */}
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{confirmPasswordError}</p>} {/* 비밀번호 확인 에러 메시지 출력 */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="profileImage">프로필 이미지</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
              onChange={handleProfileImageChange}
            />
            {profileImage && <img src={profileImage} alt="프로필 미리보기" className="mt-2 w-24 h-24 rounded-full" />}
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>취소</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
