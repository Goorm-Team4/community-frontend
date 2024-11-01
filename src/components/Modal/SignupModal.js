import React, { useState } from "react";
import styled from "styled-components";
import character from "../../assets/character.svg";
import closeButton from "../../assets/closeButton.svg";
import githubIcon from "../../assets/githubIcon.svg";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";

function SignupModal() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleSignup = () => {};

  return (
    <React.Fragment>
      <SignupContainer>
        <WelcomeSection>
          <CharImg src={character} />
          <WelcomeText>환영합니다!</WelcomeText>
        </WelcomeSection>

        <SignupSection>
          <CloseButton>
            <img
              src={closeButton}
              alt="closeBtn"
              style={{ cursor: "pointer" }}
            />
          </CloseButton>
          <Title>회원가입</Title>
          <P>이메일로 회원가입</P>

          <SignupForm>
            <Input
              value={email}
              placeholder="이메일을 입력하세요."
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={nickname}
              placeholder="사용자 이름을 입력하세요."
              onChange={(e) => setNickname(e.target.value)}
            />
            <Input
              value={pw}
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setPw(e.target.value)}
            />
            <Input
              value={confirmPw}
              placeholder="비밀번호를 다시 입력하세요."
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <Button onClick={() => handleSignup()}>회원가입</Button>
          </SignupForm>

          <SocialSection>
            <P>소셜 계정으로 회원가입</P>
            <SocialButton>
              <SocialIcon src={githubIcon} alt="githubIcon" />
              <SocialIcon src={googleIcon} alt="googleIcon" />
              <SocialIcon src={facebookIcon} alt="facebookIcon" />
            </SocialButton>
          </SocialSection>

          <FootSection>
            <FootText>계정이 이미 있으신가요?</FootText>
            <FootLink>로그인</FootLink>
          </FootSection>
        </SignupSection>
      </SignupContainer>
    </React.Fragment>
  );
}

export default SignupModal;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 606px;
  height: 530px;
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

const SignupSection = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  padding: 24px;
  padding-top: 10px;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: #212529;
`;

const P = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: #868e96;
  font-weight: 600;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: 1px solid #dee2e6;
  border-radius: 2px;
  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
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
  width: 40px;
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const SocialButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const FootSection = styled.p`
  color: #12b886;
  display: flex;
  justify-content: flex-end;
`;

const FootText = styled.p`
  margin-right: 0.25rem;
`;

const FootLink = styled.p`
  font-weight: 600;
  cursor: pointer;
  &: hover {
    text-decoration: underline;
  }
`;
