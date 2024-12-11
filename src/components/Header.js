import React, { useState } from "react";
import * as Styles from "../styles/HeaderStyles";
import { useNavigate } from "react-router-dom";

import logo1 from "../assets/logo.svg";
import notification from "../assets/notification.svg";
import search from "../assets/search.svg";
import defaultProfile from "../assets/userProfile.png";
import dropdown from "../assets/dropdown.svg";

import LoginModal from "./Modal/LoginModal";
import SignupModal from "./Modal/SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";
import { logoutUser } from "../redux/userSlice";


function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { isModalOpen, modalType } = useSelector((state) => state.modal);
  const isLogin = useSelector((state) => state.user.accessToken);

  const profileImageUrl = useSelector((state) => state.user.profileImageUrl);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(openModal("login"));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logoutUser());
    navigate("/");
  };

  const openWrite = () => {
    if (isLogin) {
      navigate("/post/write");
    } else {
      alert('로그인을 해주세요');
    }
  } 

  return (
    <React.Fragment>
      <Styles.HeaderContainer>
        <Styles.HeaderBox>
          <Styles.LogoImg src={logo1} onClick={() => navigate("/")}></Styles.LogoImg>

          {isLoggedIn ? (
            <Styles.RightSection>
              <Styles.NoticeIcon src={notification} />
              <Styles.SearchIcon src={search} />

              <Styles.WriteButton onClick={openWrite}>새 글 작성</Styles.WriteButton>
              <Styles.ProfileIcon src={profileImageUrl || defaultProfile} />

              <Styles.DropdownIcon src={dropdown} onClick={toggleDropdown} />

              {isDropdownOpen && (
                <Styles.DropdownBox>
                  <Styles.DropdownMenu>
                    <Styles.DropdownItem>내 벨로그</Styles.DropdownItem>
                    <Styles.DropdownItem onClick={() => { navigate("/mypage"); toggleDropdown(); }}>설정</Styles.DropdownItem>
                    <Styles.DropdownItem onClick={handleLogout}>로그아웃</Styles.DropdownItem>
                  </Styles.DropdownMenu>
                </Styles.DropdownBox>
              )}
            </Styles.RightSection>
          ) : (
            <Styles.RightSection>
              <Styles.NoticeIcon src={notification} />
              <Styles.SearchIcon src={search} />
              <Styles.LoginButton onClick={openLoginModal}>로그인</Styles.LoginButton>
              {isModalOpen && modalType === "login" && <LoginModal />}
              {isModalOpen && modalType === "signup" && <SignupModal />}
            </Styles.RightSection>
          )}
        </Styles.HeaderBox>
      </Styles.HeaderContainer>
    </React.Fragment>
  );
}

export default Header;