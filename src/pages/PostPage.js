import React, { useEffect } from 'react'
import * as Styles from '../styles/PostStyles'
import TempImg from '../assets/image.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentRead, getId } from '../redux/contentSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.content);
  const isActive = useSelector((state) => state.darkMode.darkModeActive);

  useEffect(() => {
    dispatch(getId(id));
    const apiAction = dispatch(fetchContentRead());
    const apiResult = unwrapResult(apiAction);
  }, [id, dispatch])
  
  const getMonthDiff = () => {
    const today = new Date();
    const createContentDay = new Date(content.date);

    const diffDate = today.getTime() - createContentDay.getTime();

    return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24)));
  }

  return (
    <Styles.PostPage $active={isActive}>
      <Styles.PostHeader>
        <h1>
          {content.title}
        </h1>
        <Styles.Info>
          <span className='username'>{content.writer}</span>
          <span className='separator'>·</span>
          <span>{getMonthDiff()}일 전</span>
        </Styles.Info>
        <img src={TempImg} alt='title img'></img>
      </Styles.PostHeader>
      <Styles.PostContent>
        {content.content}
      </Styles.PostContent>
      <Styles.PostCommentArea>
        <h4>2개의 댓글</h4>
        <textarea placeholder='댓글을 입력하세요'></textarea>
        <div className='button-wrapper'>
          <button>댓글 작성</button>
        </div>
        <Styles.PostCommentList>
          <Styles.PostCommentPorfile>
            <a href='/'>
              <img src={TempImg} alt='progile' />
            </a>
            <div className='profileInfo'>
              <a href='/'>이름이름</a>
              <div className='date'>6 days ago</div>
            </div>
          </Styles.PostCommentPorfile>
          <Styles.PostCommentText>
            댓글을 적는 부분 임시로 적은 댓글입니다.
          </Styles.PostCommentText>
        </Styles.PostCommentList>
      </Styles.PostCommentArea>
    </Styles.PostPage>
  )
}

export default PostPage