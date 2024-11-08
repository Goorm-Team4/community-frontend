import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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

export const Logo = styled.div`
  font-size: 1.5rem;
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

export const PostcardList = styled.ul`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 2fr 2fr 2fr 2fr;
  grid-template-rows: 2fr 2fr 2fr 2fr;
  width: 100vw;
  height: 100vh;
`;

export const Postcard = styled.li`
  width: 300px;
  height: 200px;
  background-color: gray;
  background-size: cover;
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .04);
  align-content: center;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  transition: box-shadow .25s ease-in, transform .25s ease-in;

`;

export const PostcardImage = styled.img`
  background-color: aliceblue;
  height: 30%;
  display: block;
  color: inherit;
  text-decoration: none;
`;

export const PostcardImageSize = styled.div`
  padding-top: 52.1921%;
`;


export const PostcardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  font-size: 0.75rem;
`;

export const PostcardFooter = styled.div`
  padding: .625rem 1rem;
  border-top: 1px solid gray;
  display: flex;
  font-size: .75rem;
  line-height: 1.5;
  justify-content: space-between;
`;
