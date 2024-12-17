import React, { useEffect } from 'react';
import PostCard from '../components/PostCard';
import { MainContianer, PostcardGrid } from '../styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import { fetchContentList } from '../redux/listSlice';
import { unwrapResult } from '@reduxjs/toolkit';



function MainPage() {
  const dispatch = useDispatch();

  const isList = useSelector((state) => state.contentList.contentList)
  console.log(isList);


  useEffect(() => {
    const apiAction = dispatch(fetchContentList());
    const apiResult = unwrapResult(apiAction);
  }, [dispatch]);

  return (
    <MainContianer>
      <NavBar></NavBar>
      <PostcardGrid>
        {isList !== '' && isList.map((card) => (
          <PostCard key={card.postId} card={card} />
        ))}
        {isList.length === 0 && <div>
          게시글이 없습니다.</div>}
      </PostcardGrid>
    </MainContianer>
  )
}

export default MainPage;