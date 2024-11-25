import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import { useSelector } from 'react-redux';
import { GlobalStyle } from './styles/Styles';
import Header from './components/Header';
import Loading from "./components/Loading";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyle } from "./styles/Styles";
import Header from "./components/Header";
import { storeLogin } from "./services/auth";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = useSelector((state) => state.darkMode.darkModeActive);

  useEffect(() => {
    storeLogin(dispatch, location, navigate);
  }, [dispatch, location, navigate]);

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
