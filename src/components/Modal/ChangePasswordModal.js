import React, { useState, useRef } from "react";
import axios from "axios";
import * as Styles from "../../styles/ModalStyles";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { openModal, closeModal } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
import closeButton from "../../assets/closeButton.svg";
import { logoutUser } from "../../redux/userSlice";

function ChangePasswordModal() {
  const dispatch = useDispatch();

  const modalRef = useRef();
  useOnClickOutside(modalRef, () => dispatch(closeModal()));

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호 변경
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다. 다시 로그인해주세요.");
      dispatch(logoutUser()); // 상태 초기화
      dispatch(openModal("login")); // 로그인 모달 열기
      return;
    }
    
    const passwordInfo = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/password`,
        passwordInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // 디버깅용 (추후 삭제)
      console.log("AccessToken:", token);
      console.log("API Response:", response.data);

      if (response.data.code === "200") {
        console.log(response.data);
        alert("비밀번호가 성공적으로 변경되었습니다.");

        localStorage.removeItem("accessToken"); // 기존 토큰 삭제
        dispatch(logoutUser()); // 로그아웃 처리
        dispatch(closeModal()); // 변경 완료 시 모달 닫음

      } else {
        alert(`비밀번호 변경 실패: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        dispatch(logoutUser());
        dispatch(openModal("login"));
      } else {
        const errorMessage = error.response?.data?.message || "비밀번호 변경에 실패했습니다.";
        alert(`비밀번호 변경 실패: ${errorMessage}`);
      }
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

            <Styles.Title>비밀번호 변경</Styles.Title>
            <br />
            <Styles.Form onSubmit={handleChangePassword}>
              <Styles.Input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Styles.Input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Styles.Input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Styles.Button type="submit">변경</Styles.Button>
            </Styles.Form>
          </Styles.PasswordSection>
        </Styles.Container>
      </Styles.ModalOverlay>
    </React.Fragment>
  );
}

export default ChangePasswordModal;
