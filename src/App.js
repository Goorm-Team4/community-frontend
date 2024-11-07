import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Header from './components/Header';
import LoginModal from './components/Modal/LoginModal';
import SignupModal from './components/Modal/SignupModal';

function App() {
  return (
    <React.Fragment>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
    </React.Fragment>

  );
}

export default App;
