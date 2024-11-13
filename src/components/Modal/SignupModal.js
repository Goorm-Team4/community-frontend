import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  onValidMail,
  onValidCode,
  checkUsername,
  emailSignup,
} from "../../services/auth";
import { setLoading, clearLoading } from "../../redux/loadingSlice";
import character from "../../assets/character.svg";
import closeButton from "../../assets/closeButton.svg";
import githubIcon from "../../assets/githubIcon.svg";
import googleIcon from "../../assets/googleIcon.svg";
import kakaoIcon from "../../assets/kakaoIcon.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Timer from "../Timer";
import { signupUser } from "../../redux/userSlice";

function SignupModal({ closeModal, openLoginModal }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [isGetCode, setIsGetCode] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [count, setCount] = useState(180);

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalRef = useRef();
  useOnClickOutside(modalRef, closeModal);

  // 이메일 인증코드 전송
  const handleSendCode = useCallback(async () => {
    dispatch(setLoading());
    try {
      await onValidMail(email);
      setIsGetCode(true);
      setIsTimer(true);
      setCount(180);
      setMsg("인증 코드가 전송되었습니다.");
      dispatch(clearLoading());
    } catch (error) {
      dispatch(clearLoading());
      setMsg("인증 코드 전송에 실패했습니다.");
    }
  }, [dispatch, email]);

  const handleVerifyCode = useCallback(async () => {
    try {
      const response = await onValidCode(email, codeValue);
      if (response.code === "200" && response.result.success) {
        setIsEmailChecked(true);
        setMsg("이메일 인증이 완료되었습니다.");
        setStep(2); // 추가 정보 입력 페이지로 이동
      } else {
        setMsg("인증 코드가 일치하지 않습니다.");
      }
    } catch (error) {
      setMsg("인증 코드 검증에 실패했습니다.");
    }
  }, [email, codeValue]);

  const handleCheckNickname = async (e) => {
    e.preventDefault();

    try {
      const response = await checkUsername(username);
      if (response.result.duplicate === false) {
        setIsUsernameChecked(true);
        setMsg("사용 가능한 닉네임입니다.");
      } else {
        console.log(response);
        console.log(response.result.duplicate);
        setMsg("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      setMsg("닉네임 중복 확인 실패");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      setMsg("모든 항목을 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const info = { email, username, password };
      const response = await emailSignup(info, profileImage);

      if (response.code === "200") {
        dispatch(signupUser({ email, username, profileImage }));
        alert("회원가입이 완료되었습니다.");
        dispatch(closeModal);
        navigate("/");
      } else {
        setMsg("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setMsg("회원가입 요청 실패");
      console.error(
        "회원가입 요청 실패:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return (
    <React.Fragment>
      <ModalOverlay>
        <SignupContainer ref={modalRef}>
          <WelcomeSection>
            <CharImg src={character} />
            <WelcomeText>환영합니다!</WelcomeText>
          </WelcomeSection>

          <SignupSection>
            <CloseButton>
              <img
                onClick={closeModal}
                src={closeButton}
                alt="closeBtn"
                style={{ cursor: "pointer" }}
              />
            </CloseButton>

            {step === 1 && (
              <>
                <Title>회원가입</Title>
                <P>이메일로 회원가입</P>
                <VerifyForm>
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setMsg("")}
                    required
                  />
                  <Button
                    onClick={handleSendCode}
                    disabled={!email || isEmailChecked}
                  >
                    이메일 인증
                  </Button>

                  {isTimer && !isEmailChecked ? (
                    <Timer count={count} setCount={setCount} />
                  ) : null}

                  {isGetCode && (
                    <>
                      <Input
                        name="authCode"
                        value={codeValue}
                        placeholder="인증 코드를 입력해주세요."
                        onChange={(e) => setCodeValue(e.target.value)}
                      />
                      <Button onClick={handleVerifyCode} disabled={!codeValue}>
                        확인
                      </Button>
                    </>
                  )}
                </VerifyForm>
              </>
            )}

            {step === 2 && (
              <>
                <Title>환영합니다!</Title>
                <P>기본 회원 정보를 등록해주세요.</P>
                <SignupForm>
                  <Input
                    type="text"
                    placeholder="닉네임을 입력해주세요."
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setIsUsernameChecked(false);
                      setMsg("");
                    }}
                  />
                  <Button
                    onClick={handleCheckNickname}
                    disabled={!username || isUsernameChecked}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    닉네임 중복 확인
                  </Button>

                  <Input
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Input
                    value={password}
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    value={confirmPassword}
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <Button onClick={handleSignup} disabled={!isUsernameChecked}>
                    회원가입
                  </Button>
                </SignupForm>
              </>
            )}

            {msg && <Message>{msg}</Message>}

            {step === 1 && (
              <>
                <SocialSection isGetCode={isGetCode}>
                  <P>소셜 계정으로 회원가입</P>
                  <SocialButton>
                    <SocialIcon src={githubIcon} alt="githubIcon" />
                    <SocialIcon src={googleIcon} alt="googleIcon" />
                    <SocialIcon src={kakaoIcon} alt="kakaoIcon" />
                  </SocialButton>
                </SocialSection>

                <FootSection>
                  <FootText>계정이 이미 있으신가요?</FootText>
                  <FootLink onClick={openLoginModal}>로그인</FootLink>
                </FootSection>
              </>
            )}
          </SignupSection>
        </SignupContainer>
      </ModalOverlay>
    </React.Fragment>
  );
}

export default SignupModal;

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
  background: hsla(0, 0%, 98%, 0.85);
`;

const SignupContainer = styled.div`
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
  color: white;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#12b886")};

  &:not(:disabled):hover {
    background-color: #20c997;
  }
`;

const VerifyForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const SocialIcon = styled.img`
  cursor: pointer;
  width: 40px;
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ isGetCode }) => (isGetCode ? "0" : "8rem")};
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

const Message = styled.p`
  color: red;
  text-align: center;
  font-size: 15px;
  margin-top: auto;
`;
