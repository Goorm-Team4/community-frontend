import React from 'react'
import { Postcard, PostcardImage, PostcardContent, PostcardFooter } from '../styles/Styles'

export default function PostCard() {
  return (
    <Postcard>
      <PostcardImage />
      <PostcardContent>
        <div>
          <div>
            titie
          </div>
          <div>
            content
          </div>
        </div>
        <div>
          날짜, 댓글수
        </div>
      </PostcardContent>
      <PostcardFooter>
        <div>
          <div>
            icon
          </div>
          <div>
            name
          </div>
        </div>
        <div>
          <div>
            icon
          </div>
          <div>
            좋아요
          </div>
        </div>
      </PostcardFooter>
    </Postcard>
  )
}
