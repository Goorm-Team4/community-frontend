import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginModal from './components/Modal/LoginModal';
import SignupModal from './components/Modal/SignupModal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      {/* 레이아웃 확인하기 위함 */}
      <Route path="/login" element={<LoginModal />} />
      <Route path="/sign-up" element={<SignupModal />} />
    </Routes>

  );
}

export default App;
