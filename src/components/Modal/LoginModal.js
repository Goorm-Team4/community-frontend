import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import * as Styles from "../../styles/ModalStyles";
import character from "../../assets/character.svg";
import closeButton from "../../assets/closeButton.svg";
import githubIcon from "../../assets/githubIcon.svg";
import googleIcon from "../../assets/googleIcon.svg";
import kakaoIcon from "../../assets/kakaoIcon.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { emailLogin } from "../../services/auth";
import { loginUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function LoginModal({ closeModal, openSignupModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 모달 영역 외부 클릭 시 닫힘
  const modalRef = useRef();
  useOnClickOutside(modalRef, closeModal);

  const kakaoAuthRedirect = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("잘못된 형식입니다.");
      return;
    }

    try {
      const response = await emailLogin(email, password);

      if (response.code === "200") {
        const accessToken = response.result.accessToken;
        localStorage.setItem("accessToken", accessToken);
        dispatch(loginUser({ accessToken }));
        
        alert("로그인 성공");
        navigate("/");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.log(email, password);
      console.error("로그인 실패: ", error.response?.data || error.message);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      return;
    }
  };

  return (
    <React.Fragment>
      <Styles.ModalOverlay>
        <Styles.Container ref={modalRef}>
          <Styles.WelcomeSection>
            <Styles.CharImg src={character} />
            <Styles.WelcomeText>환영합니다!</Styles.WelcomeText>
          </Styles.WelcomeSection>

          <Styles.LoginSection>
            <Styles.CloseButton>
              <img
                onClick={closeModal}
                src={closeButton}
                alt="closeBtn"
                style={{ cursor: "pointer" }}
              />
            </Styles.CloseButton>
            <Styles.Title>로그인</Styles.Title>
            <Styles.P>이메일로 로그인</Styles.P>

            <Styles.Form onSubmit={handleEmailLogin}>
              <Styles.Input
                value={email}
                type="email"
                placeholder="이메일을 입력하세요."
                onChange={(e) => setEmail(e.target.value)}
              />
              <Styles.Input
                value={password}
                type="password"
                placeholder="비밀번호를 입력하세요."
                onChange={(e) => setPassword(e.target.value)}
              />
              <Styles.Button type="submit">로그인</Styles.Button>
            </Styles.Form>

            <Styles.LoginSocialSection>
              <Styles.P>소셜 계정으로 로그인</Styles.P>
              <Styles.SocialButton>
                <Styles.SocialIcon src={githubIcon} alt="githubIcon" />
                <Styles.SocialIcon src={googleIcon} alt="googleIcon" />
                <Styles.SocialIcon
                  src={kakaoIcon}
                  alt="kakaoIcon"
                  onClick={kakaoAuthRedirect}
                />
              </Styles.SocialButton>
            </Styles.LoginSocialSection>

            <Styles.FootSection>
              <Styles.FootText>아직 회원이 아니신가요?</Styles.FootText>
              <Styles.FootLink onClick={openSignupModal}>
                회원가입
              </Styles.FootLink>
            </Styles.FootSection>
          </Styles.LoginSection>
        </Styles.Container>
      </Styles.ModalOverlay>
    </React.Fragment>
  );
}

export default LoginModal;
