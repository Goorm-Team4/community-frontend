import styled from "styled-components";

export const ModalOverlay = styled.div`
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

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 606px;
  height: 530px;
  padding-bottom: 48px;
  background-color: var(--background-white);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
`;

export const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 216px;
  height: 530px;
  padding: 24px;
  background-color: #f8f9fa;
`;

export const CharImg = styled.img`
  width: 168px;
  height: 108px;
`;

export const WelcomeText = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: #495057;
  margin-top: 24px;
  text-align: center;
`;

export const ProfileLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #495057;
  cursor: pointer;
`;

export const Preview = styled.img`
  border-radius: 50%;
  position: relative;
  object-fit: cover;
  width: 150px;
  height: 150px;
`;

export const UploadText = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 16px;
  justify-self: center;
`;

export const UploadReset = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 500;
  color: #495057;
  cursor: pointer;
`;

export const ProfileInput = styled.input`
  display: none;
`;

export const LoginSection = styled.div`
  display: flex;
  height: 530px;
  flex: 1 1;
  flex-direction: column;
  padding: 24px;
`;

export const SignupSection = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  padding: 24px;
  padding-top: 10px;
`;

export const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex: 1;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  color: var(--title);
`;

export const P = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--text2);
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-weight: 700;
  color: white;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "" : "pointer")};
  background-color: ${({ disabled }) =>
    disabled ? "var(--border)" : "var(--primary-green1)"};

  &:not(:disabled):hover {
    background-color: var(--primary-green2);
  }
`;

export const VerifyForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const SocialIcon = styled.img`
  cursor: pointer;
`;

export const LoginSocialSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const SignupSocialSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ $isGetCode }) => ($isGetCode ? "0" : "9rem")};
`;

export const SocialButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.5rem;
`;

export const FootSection = styled.div`
  color: var(--primary-green2);
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const FootText = styled.div`
  margin-right: 0.25rem;
`;

export const FootLink = styled.div`
  font-weight: 600;
  cursor: pointer;
  &: hover {
    text-decoration: underline;
  }
`;

export const Message = styled.p`
  color: red;
  text-align: center;
  font-size: 15px;
  margin-top: auto;
`;
