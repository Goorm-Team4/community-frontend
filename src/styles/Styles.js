import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  div {
    background-color: ${(props) => (props.$active ? '#f5f5f5' : '##3b3b3b')}
  }
  body {
    background-color: ${(props) => (props.$active ? '#ffffff' : '#333')}
  }
  li {
    background-color: ${(props) => (props.$active ? '#ffffff' : '#333')}
  }
`

export const MainContianer = styled.ul`
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
  padding: 1rem 2rem;
  color : ${(props) => (props.$active ? '#333' : '#ffffff')};
`;

export const LeftNavbar = styled.div`
  align-items: center;
  padding: 1rem 2rem;
`;
export const RightNavbar = styled.div`
  align-items: center;
  padding: 1rem 2rem;
`;

export const NavItems = styled.div`
  display: flex;
  color: inherit;
  gap: 1rem;
`;

export const NavItem = styled.a`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
`;

export const ToggleContainer = styled.button`
  background-color: ${(props) => (props.$active ? '#ffffff' : '#333')}; // 켜짐: 초록, 꺼짐: 회색
  color: ${(props) => (props.$active ? '#ccc' : '#ffffff')};
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.$active ? '#b8b8b8' : '#bbb')};
  }
`;
