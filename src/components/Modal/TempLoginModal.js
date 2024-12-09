import React, { useState, useRef } from "react";
import * as Styles from "../../styles/ModalStyles";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { closeModal, openModal } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
import closeButton from "../../assets/closeButton.svg";
import { emailLogin } from "../../services/auth";
import { loginUser } from "../../redux/userSlice";
import { changePasswordStatus } from "../../redux/userSlice";
import { clearLoading, setLoading } from "../../redux/loadingSlice";

function TempLoginModal() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const dispatch = useDispatch();

  const modalRef = useRef();
  useOnClickOutside(modalRef, () => dispatch(closeModal()));

  // 임시 비밀번호로 로그인
  const handleLoginByTemp = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading());
      const response = await emailLogin(email, currentPassword);
      console.log("Login API Response:", response);

      if (response.code === "200") {
        const accessToken = response.result.accessToken;
        localStorage.setItem("accessToken", accessToken);

        dispatch(
          loginUser({
            email: response.result.email,
            username: response.result.username,
            accessToken: accessToken,
          })
        );

        dispatch(closeModal());
        dispatch(changePasswordStatus(true));
        dispatch(openModal("changePassword"));
        dispatch(clearLoading());

      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.log(email, currentPassword); // 디버깅용 (추후삭제)
      console.error("로그인 실패: ", error.response?.data || error.message);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      return;
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
                onClick={closeModal}
                src={closeButton}
                alt="closeBtn"
                style={{ cursor: "pointer" }}
              />
            </Styles.CloseButton>
            <Styles.Title>로그인</Styles.Title>
            <Styles.P>임시 비밀번호로 로그인</Styles.P>
            <br />
            <Styles.Form onSubmit={handleLoginByTemp}>
              <Styles.Input
                type="email"
                value={email}
                placeholder="이메일을 입력해주세요."
                onChange={(e) => setEmail(e.target.value)}
              />
              <Styles.Input
                type="password"
                placeholder="임시 비밀번호를 입력해주세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Styles.Button type="submit">로그인</Styles.Button>
            </Styles.Form>
          </Styles.PasswordSection>
        </Styles.Container>
      </Styles.ModalOverlay>
    </React.Fragment>
  );
}

export default TempLoginModal;
