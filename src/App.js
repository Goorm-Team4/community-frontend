import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { GlobalStyle } from './styles/Styles';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import Header from "./components/Header";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { storeLogin } from "./services/auth";
import WritePage from "./pages/WritePage";

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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/write" element={<WritePage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
