import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Loading from './components/Loading';
import MainPage from './pages/MainPage';
import Header from './components/Header';

function App() {
  return (
    <React.Fragment>
        <Header />
        <Loading />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/oauth/callback/kakao" element={<LoginHandler />} /> */}
        </Routes>
    </React.Fragment>
  );
}

export default App;
