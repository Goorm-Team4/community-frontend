import React, { useState, useRef } from "react";
import styled from "styled-components";
import character from "../../assets/character.svg";
import closeButton from "../../assets/closeButton.svg";
import githubIcon from "../../assets/githubIcon.svg";
import googleIcon from "../../assets/googleIcon.svg";
import kakaoIcon from "../../assets/kakaoIcon.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";


function LoginModal({ closeModal, openSignupModal }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 모달 영역 외부 클릭 시 닫힘
  const modalRef = useRef();
  useOnClickOutside(modalRef, closeModal);

  const handleLogin = () => {
    if (email === "" || pw === "") {
      alert("잘못된 형식입니다.");
      return;
    }
  };

  return (
    <React.Fragment>
      <ModalOverlay>
        <LoginContainer ref={modalRef}>
          <WelcomeSection>
            <CharImg src={character} />
            <WelcomeText>환영합니다!</WelcomeText>
          </WelcomeSection>

          <LoginSection>
            <CloseButton>
              <img
                onClick={closeModal}
                src={closeButton}
                alt="closeBtn"
                style={{ cursor: "pointer" }}
              />
            </CloseButton>
            <Title>로그인</Title>
            <P>이메일로 로그인</P>

            <LoginForm>
              <Input
                value={email}
                placeholder="이메일을 입력하세요."
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                value={pw}
                placeholder="비밀번호를 입력하세요."
                onChange={(e) => setPw(e.target.value)}
              />
              <Button onClick={() => handleLogin()}>로그인</Button>
            </LoginForm>

            <SocialSection>
              <P>소셜 계정으로 로그인</P>
              <SocialButton>
                <SocialIcon src={githubIcon} alt="githubIcon" />
                <SocialIcon src={googleIcon} alt="googleIcon" />
                <SocialIcon src={kakaoIcon} alt="kakaoIcon" />
              </SocialButton>
            </SocialSection>

            <FootSection>
              <FootText>아직 회원이 아니신가요?</FootText>
              <FootLink onClick={openSignupModal}>회원가입</FootLink>
            </FootSection>
          </LoginSection>
        </LoginContainer>
      </ModalOverlay>
    </React.Fragment>
  );
}

export default LoginModal;

const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: hsla(0, 0%, 98%, .85);
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 606px;
  height: 530px;
  padding-bottom: 48px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 216px;
  height: 530px;
  padding: 24px;
  background-color: #f8f9fa;
`;

const CharImg = styled.img`
  width: 168px;
  height: 108px;
`;

const WelcomeText = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: #495057;
  margin-top: 24px;
  text-align: center;
`;

const LoginSection = styled.div`
  display: flex;
  height: 530px;
  flex: 1 1;
  flex-direction: column;
  padding: 24px;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: #212529;
`;

const P = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #868e96;
  font-weight: 600;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: 1px solid #dee2e6;
  border-radius: 2px;
  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-weight: 700;
  background-color: #12b886;
  color: white;
  border: none;
  cursor: pointer;

  &: hover {
    background-color: #20c997;
  }
`;

const SocialIcon = styled.img`
  cursor: pointer;
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const SocialButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.5rem;
`;

const FootSection = styled.div`
  color: #12b886;
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const FootText = styled.div`
  margin-right: 0.25rem;
`;

const FootLink = styled.div`
  font-weight: 600;
  cursor: pointer;
  &: hover {
    text-decoration: underline;
  }
`;
