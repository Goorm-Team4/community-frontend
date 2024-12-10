import React, { useMemo } from 'react'
import * as styles from "../styles/WriteStyles";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { writeContentArea, writetitle } from '../redux/writeSlice';

function WritePage() {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const isContent = useSelector((state) => state.write)

  const handleTitleChange = (e) => {
    dispatch(writetitle(e.target.value));
  };

  const handleContentChange = (value) => {
    dispatch(writeContentArea(value));
  };


  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["image"],
        [{ header: 1 }, { header: 2 }],
        ['bold', 'italic', 'underline', 'strike']
      ],
      handlers: {
      }
    },
  }), []);

  return (
    <styles.MainContianer>
      <styles.CustomQuillEditorView>
        <styles.Title
          type="text"
          placeholder="제목을 입력하세요"
          value={isContent.title}
          onChange={handleTitleChange}
        >
        </styles.Title>
        <ReactQuill
          id="quillContent"
          value={isContent.contentArea}
          onChange={handleContentChange}
          theme="snow"
          modules={modules}
          placeholder='당신의 이야기를 적어보세요...'
        />
        <div>
          <h3>Editor Output:</h3>
          <h4>{isContent.title}</h4>
          <div>{isContent.contentArea}</div>
        </div>
      </styles.CustomQuillEditorView>
      <styles.BottomContainer>
        <styles.BackButton onClick={() => naviagate("/")}>나가기</styles.BackButton>
        <styles.SendButton>글쓰기</styles.SendButton>
      </styles.BottomContainer>
    </styles.MainContianer>
  )
}

export default WritePage