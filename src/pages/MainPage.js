import React from 'react'
import { Title } from '../styles/mainStyles';
import PostCard from '../components/PostCard';
import { PostcardList } from '../styles/Styles';

function MainPage() {
  return (
    <div>
      <Title>
        community-frontend
      </Title>
      <PostcardList>
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
      </PostcardList>
    </div>
  )
}

export default MainPage;