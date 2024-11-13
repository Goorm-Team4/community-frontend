import styled from "styled-components";

export const HeaderContainer = styled.div`
  margin: 1rem;
  padding: 12px;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 70px;
  cursor: pointer;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const NoticeIcon = styled.img`
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

export const SearchIcon = styled.img`
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

export const WriteButton = styled.button`
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

export const ProfileIcon = styled.img`
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const DropdownIcon = styled.img`
  width: 30px;
  cursor: pointer;
`;

export const LoginButton = styled.button`
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
export const DropdownBox = styled.div`
  position: relative;
  display: inline-block;
  z-index: 10;
`;
export const DropdownMenu = styled.div`
  position: absolute;
  width: 12rem;
  margin-top: 1.5rem;
  right: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
  display: block;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.125s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--primary-green1);
  }
`;
