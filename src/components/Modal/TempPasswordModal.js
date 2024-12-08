import React, { useState, useRef } from "react";
import axios from "axios";
import * as Styles from "../../styles/ModalStyles";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { closeModal, openModal } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
import closeButton from "../../assets/closeButton.svg";
import { logoutUser } from "../../redux/userSlice";
import { changePasswordStatus } from "../../redux/userSlice";
import { clearLoading, setLoading } from "../../redux/loadingSlice";

function TempPasswordModal() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => { dispatch(closeModal()); };

  const modalRef = useRef();
  useOnClickOutside(modalRef, handleClose);

  // 임시 비밀번호 요청
  const handleRequestTempPassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    dispatch(setLoading());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/auth/password/temp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(clearLoading());
      console.log("임시 비밀번호 요청 성공: ", response.data);
      alert("임시 비밀번호가 전송되었습니다. 다시 로그인해주세요.");

      // 로그아웃 처리
      localStorage.removeItem("accessToken");
      dispatch(logoutUser());

      dispatch(closeModal());
      dispatch(changePasswordStatus(true));
      dispatch(openModal("tempLogin"));

    } catch (error) {
      dispatch(clearLoading());
      console.error(
        "임시 비밀번호 요청 실패: ",
        error.response?.data || error.message
      );
      alert("임시 비밀번호 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <React.Fragment>
      <Styles.ModalOverlay>
        <Styles.Container
          ref={modalRef}
          style={{ height: "auto", paddingBottom: "0" }}
        >
          <Styles.PasswordSection>
            <Styles.CloseButton>
              <img
                onClick={handleClose}
                src={closeButton}
                alt="closeBtn"
                style={{ cursor: "pointer" }}
              />
            </Styles.CloseButton>
            <Styles.Title>임시 비밀번호 요청</Styles.Title>
            <br />
            <Styles.Form onSubmit={handleRequestTempPassword}>
              <Styles.Input
                type="email"
                value={email}
                placeholder="이메일을 입력해주세요."
                onChange={(e) => setEmail(e.target.value)}
              />
              <Styles.Button type="submit">임시 비밀번호 요청</Styles.Button>
            </Styles.Form>
          </Styles.PasswordSection>
        </Styles.Container>
      </Styles.ModalOverlay>
    </React.Fragment>
  );
}

export default TempPasswordModal;
