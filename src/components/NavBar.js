import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, LeftNavbar, RightNavbar, Logo, NavItem, NavItems, ToggleContainer } from '../styles/Styles'
import { toggle } from '../redux/darkModeSlice';

export default function NavBar() {

  const isActive = useSelector((state) => state.darkMode.darkModeActive)
  const dispatch = useDispatch();

  return (
    <Navbar $active={isActive}>
      <LeftNavbar>
        <Logo>Logo</Logo>
        <NavItems>
          <NavItem href="#">전체</NavItem>
          <NavItem href="#">최신</NavItem>
          <NavItem href="#">인기</NavItem>
        </NavItems>
      </LeftNavbar>
      <RightNavbar>
      <NavItems>
          <NavItem href="#">
          <ToggleContainer $active={isActive} onClick={() => dispatch(toggle())}>
      { isActive ? '다크' : '화이트'}
    </ToggleContainer>
          </NavItem>
          <NavItem href="#">로그인</NavItem>
        </NavItems>
      </RightNavbar>
    </Navbar>
  )
}