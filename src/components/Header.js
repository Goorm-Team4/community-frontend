import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo.svg";
import notification from "../assets/notification.svg";
import search from "../assets/search.svg";
import userProfile from "../assets/userProfile.png";
import dropdown from "../assets/dropdown.svg";
import LoginModal from "./Modal/LoginModal";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <React.Fragment>
      <HeaderContainer>
        <HeaderBox>
          <LogoImg src={logo1} onClick={navigate("/")}></LogoImg>

          {isLoggedIn ? (
            <RightSection>
              <NoticeIcon src={notification} />
              <SearchIcon src={search} />
              <WriteButton>새 글 작성</WriteButton>
              <ProfileIcon src={userProfile} />
              <DropdownIcon src={dropdown} />
            </RightSection>
          ) : (
            <RightSection>
              <NoticeIcon src={notification} onClick={openModal} />
              <SearchIcon src={search} />
              <LoginButton onClick={openModal}>로그인</LoginButton>
              {isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen} />}
            </RightSection>
          )}
        </HeaderBox>
      </HeaderContainer>
    </React.Fragment>
  );
}

export default Header;

const HeaderContainer = styled.div`
  padding: 12px;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 70px;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const NoticeIcon = styled.img`
  width: 23px;
  margin-right: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.125s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SearchIcon = styled.img`
  width: 23px;
  margin-right: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.125s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const WriteButton = styled.button`
  height: 2rem;
  padding: 1px 16px;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid #212529;
  border-radius: 1rem;
  background-color: #fff;
  color: #212529;
  transition: all 0.25s;
  cursor: pointer;
  margin-right: 20px;

  &: hover {
    background-color: #212529;
    color: #fff;
  }
`;

const ProfileIcon = styled.img`
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const DropdownIcon = styled.img`
  width: 30px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  background-color: #212529;
  border: none;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #4a4a4a;
    transition: all 0.125s ease-in;
  }
`;
