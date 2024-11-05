import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Header from './components/Header';
import LoginModal from './components/Modal/LoginModal';

function App() {
  return (
    <React.Fragment>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* 레이아웃 확인하기 위함 */}
          <Route path="/login" element={<LoginModal />} />
        </Routes>
    </React.Fragment>

  );
}

export default App;
