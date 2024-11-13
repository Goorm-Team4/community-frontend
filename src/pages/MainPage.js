import React, { useEffect } from 'react'
import Title from '../styles/mainStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../services/auth';

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    kakaoLogin(dispatch, location, navigate);
  }, [dispatch, location, navigate]);
  
  return (
    <div>
      <Title>
        community-frontend
      </Title>
    </div>
  )
}

export default MainPage;