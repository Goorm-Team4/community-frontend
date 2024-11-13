import React from 'react';
import PostCard from '../components/PostCard';
import { MainContianer, PostcardGrid } from '../styles/Styles';


function MainPage() {
  
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