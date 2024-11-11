import React from 'react'
import * as Styles from '../styles/PostcardStyles'
import tempImg from '../assets/image.png'
import tempIcon from '../assets/kakaoIcon.svg'

export default function PostCard() {
  return (
    <Styles.Postcard>
      <Styles.PostcardImage href='/post'>
        <div style={{ paddingTop: '52.2%' }}>
          <img src={tempImg} alt='img'/>
        </div>
      </Styles.PostcardImage>
      <Styles.PostcardContent>
        <a href='/post'>
          <Styles.PostcardContentTitle>
            velog dashboard를 살려주세요!
          </Styles.PostcardContentTitle>
          <p>
          벨로그 통계 대시보드 페이지를 다시 찾아주시는 분이 지속적으로 있으시다,, 그래서 다시만드는 "velog dashboard" side project 로 판을 키워볼까 한다!
          </p>
        </a>
        <Styles.PostcardContentSubInfo>
          <span>6일 전</span>
          <span className='separator'>·</span>
          <span>2개의 댓글</span>
        </Styles.PostcardContentSubInfo>
      </Styles.PostcardContent>
      <Styles.PostcardFooter>
        <a href='/'>
          <img src={tempIcon} alt='icon'/>
          <span>by <b>name</b></span>
        </a>
        <Styles.PostcardFooterLikes>
          <svg viewBox='0 0 24 24'><path fill="currentColor" d="m18 1-6 4-6-4-6 5v7l12 10 12-10V6z"></path></svg> 18
        </Styles.PostcardFooterLikes>
      </Styles.PostcardFooter>
    </Styles.Postcard>
  )
}
