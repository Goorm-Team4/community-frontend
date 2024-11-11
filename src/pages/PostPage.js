import React from 'react'
import * as Styles from '../styles/PostStyles'
import TempImg from '../assets/image.png'

function PostPage() {
  return (
    <Styles.PostPage>
      <Styles.PostHeader>
        <h1>velog dashboard 를 살려주세요..! (수정됨)</h1>
        <Styles.Info>
          <span className='username'>이름</span>
          <span className='separator'>·</span>
          <span>7일 전</span>
        </Styles.Info>
        <img src={TempImg} alt='title img'></img>
      </Styles.PostHeader>
      <Styles.PostContent>
        velog dashboard 요약
        V.D. 는 취합된 통계기능이 부족한 velog 에 3'rd party web page 이다. token 값으로 velog 게시글의 모든 통계를 한 눈에 볼 수 있게 제공하는 페이지였다. (귀여운 예시 영상 참조)

        출시한지 3일만에 50명, 100명 token 등록해주셨지만 velog 쪽 통계기능은 설계적으로 기술부채가 좀 있었기 때문에 리뉴얼이 필요한 상태였다.

        그래서 아주 죄송스럽지만, velog 쪽 psql 을 부하시켜 timeout 을 유발했다..! (짧은 순간 대용량 데이터 조회로 인해..) 그래서 velog 쪽은 종합 통계 외에 daily 통계는 폐쇄했다. 그로 인해 해당 project 는 작별을 했다.

        ps) 관련 글은 아래와 같습니다. 당시 글쓰는 화자를 처음 개발해본 사람으로 잡아서 조금 어색하게 느껴질수도..
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