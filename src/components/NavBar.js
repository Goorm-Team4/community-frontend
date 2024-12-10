import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, LeftNavbar, RightNavbar, NavItem, NavItems, ToggleContainer } from '../styles/Styles'
import { toggle } from '../redux/darkModeSlice';
import { dateSort, favoriteSort } from '../redux/listSlice';

export default function NavBar() {

  const isActive = useSelector((state) => state.darkMode.darkModeActive);

  const dispatch = useDispatch();

  return (
    <Navbar $active={isActive}>
      <LeftNavbar>
        <NavItems>
          <NavItem >전체</NavItem>
          <NavItem onClick={() => dispatch(dateSort())}>최신</NavItem>
          <NavItem onClick={() => dispatch(favoriteSort())}>인기</NavItem>
        </NavItems>
      </LeftNavbar>
      <RightNavbar>
        <NavItems>
          <ToggleContainer $active={isActive} onClick={() => dispatch(toggle())}>
            {isActive ? '다크' : '화이트'}
          </ToggleContainer>
        </NavItems>
      </RightNavbar>
    </Navbar>
  )
}