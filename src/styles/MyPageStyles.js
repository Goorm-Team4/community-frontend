import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 768px;
  margin: 0 auto;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileLabel = styled.label`
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const Preview = styled.img`
  border-radius: 50%;
  position: relative;
  object-fit: cover;
  width: 130px;
  height: 130px;
`;

export const ProfileButton = styled.button`
  width: 10rem;
  height: 32px;
  border: none;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  color: var(--background-white);
  background-color: var(--primary-green1);
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: var(--primary-green2);
  }
`;

export const ProfileInput = styled.input`
  display: none;
`;

export const UserNameSection = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
`;

export const UserEmailSection = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`;

export const NameLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameInput = styled.input`
  font-size: 1.5rem;
  border: revert;
`;

export const Message = styled.span`
  color: ${(props) => (props.isUsernameChecked ? "black" : "red")};
  font-size: 14px;
  margin-top: 14px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const EmailLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const EmailTitle = styled.h2`
  font-size: 1.3rem;
  padding-top: 20px;
`;

export const Email = styled.span`
  font-size: 1rem;
  line-height: 1.5;
`;

export const EditButton = styled.button`
  width: 70px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--button-gray);
`;

export const SectionFooter = styled.p`
  font-size: 0.875rem;
  color: var(--text2);
`;

export const SaveButton = styled.button`
  width: 70px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--button-gray);
`;

export const CancelButton = styled.button`
  width: 70px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--button-gray);
`;

export const ActionSection = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const ActionTitle = styled.h2`
  font-size: 1.2rem;
`;

export const ActionButtonBox = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const PwButton = styled.button`
  height: 32px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  background-color: #ff6b6b;
  color: var(--background-white);
  border: none;
  border-radius: 4px;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;
`;

export const DelButton = styled.button`
  height: 32px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  background-color: #ff6b6b;
  color: var(--background-white);
  border: none;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
`;