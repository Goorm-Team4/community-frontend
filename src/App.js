import React from 'react';
import MainPage from './pages/MainPage';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import { GlobalStyle } from './styles/Styles';

function App() {

  const isActive = useSelector((state) => state.darkMode.darkModeActive);

  return (
    <div className="App">
      <GlobalStyle $active={isActive} />
      <NavBar></NavBar>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
