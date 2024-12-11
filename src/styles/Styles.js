import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --white: #fff;
    --gray: #f1f3f5;
    --gray1: #f8f9fa;
    --gray2: #ADB5BD;
    --background-black: #212121;
    --background-black2: #868E96;
    --background-white: #f5f5f5;
    --title: #212529;
    --text1: #ececec;
    --text2: #868e96;
    --text3: #212529;
    --border: #e0e0e0;
    --button-gray: #efefef;
    --primary-green1: #20c997;
    --primary-green2: #12b886;
  }

  * {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    box-sizing: border-box;
    text-decoration: none;
  }

  div {
    background-color: ${(props) => (props.$active ? 'var(--background-white)' : 'var(--background-black2)')}
  }

  body {
    background-color: ${(props) => (props.$active ? 'var(--background-white)' : 'var(--gray)')}
  }
  
  li {
    background-color: ${(props) => (props.$active ? 'var(--background-white)' : 'var(--gray)')}
  }

`

export const MainContianer = styled.div`
  width: 1728px;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1919px) {
      width:1376px
  }

  @media screen and (max-width: 1440px) {
      width:1024px
  }

  @media screen and (max-width: 1056px) {
      width:100%
  }
`;

export const PostcardGrid = styled.ul`
  display: grid;
  grid-gap: 32px;
  margin: 0;
  padding: 0;
  --card-count: 5;
  --width : 20%;
  --spacer: calc(var(--card-count) - 1);
  grid-template-columns: repeat(var(--card-count), calc(var(--width) - (32px* var(--spacer) / var(--card-count))));
  
  @media (max-width: 1919px ) {
    --card-count: 4;
    --width : 25%;
  }
  @media (max-width: 1440px ) {
    --card-count: 3;
    --width : 33.33%;
  }
  @media (max-width: 1056px ) {
    --card-count: 2;
    --width : 50%;
  }
  @media (max-width: 768px ) {
    grid-template-columns: repeat(1, 100%);
    grid-gap: 16px;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem;
  color : ${(props) => (props.$active ? '#333' : '#ffffff')};
`;

export const LeftNavbar = styled.div`
  align-items: center;
`;
export const RightNavbar = styled.div`
  align-items: center;
`;

export const NavItems = styled.div`
  display: flex;
  color: inherit;
  gap: 1rem;
`;

export const NavItem = styled.button`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  cursor: pointer;
`;

export const ToggleContainer = styled.button` // 켜짐: 초록, 꺼짐: 회색
  color: ${(props) => (props.$active ? 'var(--text3)' : '#ffffff')};
  font-weight: 400;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.$active ? '#b8b8b8' : '#bbb')};
  }
`;
