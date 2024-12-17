import React, { useEffect } from 'react'
import * as Styles from '../styles/PostStyles'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentRead } from '../redux/contentSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const apiAction = dispatch(fetchContentRead(id));
  const apiResult = async () => await unwrapResult(apiAction);
  const content = useSelector((state) => state.content.contentData);
  const isActive = useSelector((state) => state.darkMode.darkModeActive);

  console.log("게시글 번호 " + id + " 콘텐트 " + content);
  console.log(content);

  const getMonthDiff = () => {
    const today = new Date();
    const createContentDay = new Date(content.createdAt);

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
          <span className='username'>{content.title}</span>
          <span className='separator'>·</span>
          <span>{getMonthDiff()}일 전</span>
        </Styles.Info>
        <img src={content.imageUrl} alt='title img'></img>
      </Styles.PostHeader>
      <Styles.PostContent>
        {content.content}
      </Styles.PostContent>
      <Styles.PostCommentArea>
        {/* <h4>{content.comments.length}개의 댓글</h4> */}
        <textarea placeholder='댓글을 입력하세요'></textarea>
        <div className='button-wrapper'>
          <button>댓글 작성</button>
        </div>
        {/* {content.comments.map((comment) => (
          <Styles.PostCommentList>
            <Styles.PostCommentPorfile>
              <a href='/'>
                <img src={comment.author.profileImageUrl} alt='progile' />
              </a>
              <div className='profileInfo'>
                <a href='/'>{comment.author.username}</a>
                <div className='date'>{comment.createdAt}</div>
              </div>
            </Styles.PostCommentPorfile>
            <Styles.PostCommentText>
              {comment.content
              }
            </Styles.PostCommentText>
          </Styles.PostCommentList>
        ))} */}
      </Styles.PostCommentArea>
    </Styles.PostPage>
  )
}

export default PostPage
