import React from 'react'
import * as Styles from '../styles/PostcardStyles'
import tempIcon from '../assets/kakaoIcon.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostCard({ card }) {

  const isActive = useSelector((state) => state.darkMode.darkModeActive);

  const getMonthDiff = () => {
    const today = new Date();
    const createContentDay = new Date(card.createdAt);

    const diffDate = today.getTime() - createContentDay.getTime();

    return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24)));
  }

  return (
    <Styles.Postcard $active={isActive}>
      <Styles.PostcardImage>
        <Link to={`/post/${card.postId}`}>
          <div style={{ paddingTop: '52.2%' }}>
            <img src={card.imageUrl} alt='img' />
          </div>
        </Link>
      </Styles.PostcardImage>
      <Styles.PostcardContent>
        <Link to={`/post/${card.postId}`}>
          <Styles.PostcardContentTitle>
            {card.title}
          </Styles.PostcardContentTitle>
          <p>
            
            {card.title}
          </p>
        </Link>
        <Styles.PostcardContentSubInfo>
          <span>{getMonthDiff()}일 전</span>
          <span className='separator'>·</span>
          <span>{card.commentCount}개의 댓글</span>
        </Styles.PostcardContentSubInfo>
      </Styles.PostcardContent>
      <Styles.PostcardFooter>
        <Link>
          <img src={tempIcon} alt='icon' />
          <span>by <b>{card.author.username}</b></span>
        </Link>
        <Styles.PostcardFooterLikes>
          <svg viewBox='0 0 24 24'><path fill="currentColor" d="m18 1-6 4-6-4-6 5v7l12 10 12-10V6z"></path></svg> {card.likeCount}
        </Styles.PostcardFooterLikes>
      </Styles.PostcardFooter>
    </Styles.Postcard>
  )
}
