import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../services/auth';
import PostCard from '../components/PostCard';
import { MainContianer, PostcardGrid } from '../styles/Styles';


function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    kakaoLogin(dispatch, location, navigate);
  }, [dispatch, location, navigate]);
  
  return (
    <MainContianer>
      <PostcardGrid>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </PostcardGrid>
    </MainContianer>
  )
}

export default MainPage;