import styled from "styled-components";

export const Postcard = styled.li`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.04);
  transition: box-shadow .25s ease-in,transform .25s ease-in;
  background-color: ${(props) => (props.$active ? 'var(--white)' : 'var(--gray2)')};

  &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 20px 0 rgba(0,0,0,.08);
      @media (max-width: 1024px) {
          transform: none;
      }
  }

`;

export const PostcardImage = styled.div`
  display: block;
  color: inherit;
  text-decoration: none;
  width: 100%;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover
  }
`;

export const PostcardContent = styled.div`
    padding: 1rem;
    display: flex;
    flex: 1 1;
    flex-direction: column;
    background-color: inherit;

    a {
      display: block;
      color: inherit;
      text-decoration: none
    }

    p {
        word-break: break-word;
        overflow-wrap: break-word;
        font-size: .875rem;
        line-height: 1.5;
        color: black;
        margin: 0 0 1.5rem
    }

`;

export const PostcardContentSubInfo = styled.div`
  margin-top: auto;
  font-size: .75rem;
  line-height: 1.5;
  color: var(--gray3);;
  background-color: inherit;

  .separator {
    margin-left: .25rem;
    margin-right: .25rem;
  }
`;

export const PostcardContentTitle = styled.h4`
  font-size: 1rem;
  margin: 0 0 .25rem;
  line-height: 1.5;
  word-break: break-word;
  color: black;
  @media screen and (max-width: 767px) {
      white-space:normal
  }
`;

export const PostcardFooter = styled.div`
  padding: .625rem 1rem;
  border-top: 1px solid gray;
  display: flex;
  font-size: .75rem;
  line-height: 1.5;
  justify-content: space-between;
  background-color: inherit;

  a {
    text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        img {
            object-fit: cover;
            border-radius: 50%;
            width: 1.5rem;
            height: 1.5rem;
            display: block;
            margin-right: .5rem
        }

        span {
            color: var(--gray3);;
            b {
              color: black;
            }
        }
  }
`;

export const PostcardFooterLikes = styled.div`
  display: flex;
  align-items: center;
  color: black;
  background-color: inherit;

  svg {
    width: .75rem;
    height: .75rem;
    margin-right: .5rem
  }
`;
