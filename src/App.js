import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Loading from './components/Loading';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { GlobalStyle } from './styles/Styles';
import Header from './components/Header';

function App() {

  const isActive = useSelector((state) => state.darkMode.darkModeActive);
  return (
    <React.Fragment>
      <GlobalStyle $active={isActive} />
      <Header></Header>
      <Loading />
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
