import React from 'react';
import PostCard from '../components/PostCard';
import { MainContianer, PostcardGrid } from '../styles/Styles';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';



function MainPage() {

  const isList = useSelector((state) => state.contentList.contentList)

  return (
    <MainContianer>
      <NavBar></NavBar>
      <PostcardGrid>
        {isList.map((card) => (
          <PostCard key={card.id} card={card} />
        ))}
      </PostcardGrid>
    </MainContianer>
  )
}

export default MainPage;