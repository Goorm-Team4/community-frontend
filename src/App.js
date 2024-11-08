import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { GlobalStyle } from './styles/Styles';
import Header from './components/Header';

function App() {

  const isActive = useSelector((state) => state.darkMode.darkModeActive);
  return (
    <React.Fragment>
        <Header></Header>
        <Routes>
      <GlobalStyle $active={isActive} />
      <NavBar></NavBar>
          <Route path="/" element={<MainPage />} ></MainPage>
        </Routes>
    </React.Fragment>

  );
}

export default App;
