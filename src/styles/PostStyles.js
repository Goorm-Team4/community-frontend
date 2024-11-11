import styled from "styled-components";

export const PostPage = styled.div`
  margin-top: 5.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const PostHeader = styled.div`
  display: block;

  h1{
    font-size: 3rem;
    line-height: 1.5;
    letter-spacing: -0.004em;
    margin-top: 0px;
    font-weight: 800;
    color: black;
    margin-bottom: 2rem;
    word-break: keep-all;
    overflow-wrap: break-word;
    transition: color 0.125s ease-in;
  }

  img {
    max-height: 100vh;
    max-width: 100%;
    width: auto;
    margin: 2rem auto 0px;
    height: auto;
    object-fit: contain;
    display: block;
  }
`

export const Info = styled.div`
  font-size: 1rem;
  color: black;
  display: flex;
  align-items: center;

  .username {
    color: black;
    font-weight: bold;
  }

  .separator {
    margin-left: .25rem;
    margin-right: .25rem;
  }
`

export const PostContent = styled.div`
    margin: 5rem auto 0px;
    font-size: 1.125rem;
    color: balck;
    transition: color 0.125s ease-in;
    line-height: 1.7;
    letter-spacing: -0.004em;
    word-break: keep-all;
    overflow-wrap: break-word;
`

export const PostCommentArea = styled.div`
  margin-top: 3rem;
  color: black;

  h4 {
    font-size: 1.125rem;
    line-height: 1.5;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  textarea {
    resize: none;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border: 1px solid black;
    margin-bottom: 1.5rem;
    width: 100%;
    border-radius: 4px;
    min-height: 6.125rem;
    font-size: 1rem;
    color: gray;
    line-height: 1.75;
    background: white;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    background: green;
    color: white;
    border-radius: 4px;
    padding: 0px 1.25rem;
    height: 2rem;
    font-size: 1rem;
  }
`

export const PostCommentList = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

export const PostCommentPorfile = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;

    a {
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }

    img {
      width: 3.375rem;
      height: 3.375rem;
      display: block;
      border-radius: 50%;
      object-fit: cover;
    }

    .profileInfo {
      margin-left: 1rem;
      line-height: 1;
    }

    .date {
      margin-top: 0.5rem;
      color: gray;
      font-size: 0.875rem;
    }
`

export const PostCommentText = styled.div`
  font-size: 1.125rem;
  color: black;
  transition: color 0.125s ease-in;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`