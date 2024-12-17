import styled from "styled-components";

export const MainContianer = styled.div`
  width: 1728px;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1919px) {
      width:1376px
  }

  @media screen and (max-width: 1440px) {
    width:1024px
  }
  
  @media screen and (max-width: 1056px) {
    width:100%
  }
  `;

export const Title = styled.input`
  margin: 4px 0px;
  padding: 10px 4px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ddd;
`
export const CustomQuillEditorView = styled.div`

  #toolBar {
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    color: black;
    font-size: 32px;
    
    .ql-formats {
      display: inline-block;
      position: relative;
      top: -10px;
    
      .image-btn {
        font-size: 18px;
        cursor: pointer;
        
        .icon-custom {
          margin-right: 5px;
          font-size: 24px;
        }
      }
    }
  }

  #quillContent {
    background-color: grey;
    
    .ql-container {
      box-sizing: border-box;
      height: 300px;
      width: auto;
      padding: 5px 10px;
      border: none;
      
      .ql-editor {

        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-thumb {
          background: gray; /* 스크롤바의 색상 */
          border-radius: 15px;
          cursor: pointer;
        }

        &::-webkit-scrollbar-track {
          background: rgba(200, 200, 200, .1);
        }
      }
    }
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 6px;
`

export const SendButton = styled.button`
  width: 100px;
  height: 40px;
  padding: 3px 6px;
  background-color: var(--primary-green2);
  color: var(--white);
  cursor: pointer;
`

export const BackButton = styled.button`
  width: 100px;
  height: 40px;
  padding: 3px 6px;
  background-color: var(--primary-green2);
  color: var(--white);
  cursor: pointer;
`