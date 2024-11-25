import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Styles from "../../styles/ModalStyles";
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
import defaultProfile from "../../assets/userProfile.png";
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
  const [preview, setPreview] = useState(defaultProfile);

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

  const handleProfileImage = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setProfileImage(null);
      setPreview(defaultProfile);
    }
  };

  const handleProfileReset = () => {
    setProfileImage(null);
    setPreview(defaultProfile);
  };

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
      <Styles.ModalOverlay>
        <Styles.Container ref={modalRef}>
          {step === 1 && (
            <>
              <Styles.WelcomeSection>
                <Styles.CharImg src={character} />
                <Styles.WelcomeText>환영합니다!</Styles.WelcomeText>
              </Styles.WelcomeSection>
            </>
          )}
          {step === 2 && (
            <>
              <Styles.WelcomeSection>
                <Styles.ProfileLabel htmlFor="profileImage">
                  <Styles.Preview src={preview} alt="미리보기" />
                  <Styles.UploadText>이미지 업로드</Styles.UploadText>
                </Styles.ProfileLabel>
                <Styles.UploadReset onClick={handleProfileReset}>
                  이미지 제거
                </Styles.UploadReset>

                <Styles.ProfileInput
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  onChange={handleProfileImage}
                />
              </Styles.WelcomeSection>
            </>
          )}

          <Styles.SignupSection>
            <Styles.CloseButton>
              <img
                onClick={closeModal}
                src={closeButton}
                alt="closeBtn"
                style={{ cursor: "pointer" }}
              />
            </Styles.CloseButton>

            {step === 1 && (
              <>
                <Styles.Title>회원가입</Styles.Title>
                <Styles.P>이메일로 회원가입</Styles.P>
                <Styles.VerifyForm>
                  <Styles.Input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setMsg("")}
                    required
                  />
                  <Styles.Button
                    onClick={handleSendCode}
                    disabled={!email || isEmailChecked}
                  >
                    이메일 인증
                  </Styles.Button>

                  {isTimer && !isEmailChecked ? (
                    <Timer count={count} setCount={setCount} />
                  ) : null}

                  {isGetCode && (
                    <>
                      <Styles.Input
                        name="authCode"
                        value={codeValue}
                        placeholder="인증 코드를 입력해주세요."
                        onChange={(e) => setCodeValue(e.target.value)}
                      />
                      <Styles.Button
                        onClick={handleVerifyCode}
                        disabled={!codeValue}
                      >
                        확인
                      </Styles.Button>
                    </>
                  )}
                </Styles.VerifyForm>
              </>
            )}

            {step === 2 && (
              <>
                <Styles.Title>환영합니다!</Styles.Title>
                <Styles.P>기본 회원 정보를 등록해주세요.</Styles.P>
                <Styles.Form>
                  <Styles.Input
                    type="text"
                    placeholder="닉네임을 입력해주세요."
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setIsUsernameChecked(false);
                      setMsg("");
                    }}
                    style={{ marginBottom: "0.5rem" }}
                  />
                  <Styles.Button
                    onClick={handleCheckNickname}
                    disabled={!username || isUsernameChecked}
                    style={{ marginBottom: "1rem" }}
                  >
                    닉네임 중복 확인
                  </Styles.Button>

                  <Styles.Input
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Styles.Input
                    value={password}
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Styles.Input
                    value={confirmPassword}
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <Styles.Button
                    onClick={handleSignup}
                    disabled={!isUsernameChecked}
                  >
                    회원가입
                  </Styles.Button>
                </Styles.Form>
              </>
            )}

            {msg && <Styles.Message>{msg}</Styles.Message>}

            {step === 1 && (
              <>
                <Styles.SignupSocialSection $isGetCode={isGetCode}>
                  <Styles.P>소셜 계정으로 회원가입</Styles.P>
                  <Styles.SocialButton>
                    <Styles.SocialIcon
                      style={{ width: "40px" }}
                      src={githubIcon}
                      alt="githubIcon"
                    />
                    <Styles.SocialIcon
                      style={{ width: "40px" }}
                      src={googleIcon}
                      alt="googleIcon"
                    />
                    <Styles.SocialIcon
                      style={{ width: "40px" }}
                      src={kakaoIcon}
                      alt="kakaoIcon"
                    />
                  </Styles.SocialButton>
                </Styles.SignupSocialSection>

                <Styles.FootSection>
                  <Styles.FootText>계정이 이미 있으신가요?</Styles.FootText>
                  <Styles.FootLink onClick={openLoginModal}>
                    로그인
                  </Styles.FootLink>
                </Styles.FootSection>
              </>
            )}
          </Styles.SignupSection>
        </Styles.Container>
      </Styles.ModalOverlay>
    </React.Fragment>
  );
}

export default SignupModal;
