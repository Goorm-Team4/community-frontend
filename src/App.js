import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyle } from "./styles/Styles";

import ProtectedRoute from "./components/ProtectedRoute";
import MyPage from "./pages/MyPage";
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import Header from "./components/Header";
import Loading from "./components/Loading";
import TempLoginModal from "./components/Modal/TempLoginModal";
import ChangePasswordModal from "./components/Modal/ChangePasswordModal";
import { storeLogin } from "./services/auth";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = useSelector((state) => state.darkMode.darkModeActive);
  const { isModalOpen, modalType } = useSelector((state) => state.modal);

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
        <Route path="/mypage" element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }/>
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>

      {isModalOpen && (
        <>
          {modalType === "tempLogin" && <TempLoginModal />}
          {modalType === "changePassword" && <ChangePasswordModal />}
        </>
      )}
    </React.Fragment>
  );
}

export default App;
