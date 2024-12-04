import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import defaultProfile from "../assets/userProfile.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile, checkUsername } from "../services/auth";
import { updateUser } from "../redux/userSlice";
import { openModal } from "../redux/modalSlice";
import TempPasswordModal from "../components/Modal/TempPasswordModal";

function MyPage() {
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  const [email, setEmail] = useState(() => user.email || "");
  const [username, setUsername] = useState(() => user.username || "");
  const [profileImage, setProfileImage] = useState(
    () => user.profileImageUrl || defaultProfile
  );
  const [previewImage, setPreviewImage] = useState(defaultProfile);

  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedProfileImage, setEditedProfileImage] = useState(null);

  const [isEditing, setIsEditing] = useState({
    username: false,
    profileImage: false,
  });

  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [msg, setMsg] = useState("");

  const { isModalOpen, modalType } = useSelector((state) => state.modal);

  // 1. 프로필 조회 API 호출
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchProfile(token);
        setEmail(profile.email);
        setUsername(profile.username);
        setProfileImage(profile.profileImage);
        setPreviewImage(profile.profileImage);

        // Redux 상태 업데이트
        dispatch(updateUser(profile));
      } catch (error) {
        console.error("프로필 정보를 가져오는 데 실패했습니다.", error);
        alert("프로필 정보를 불러오는 데 실패했습니다.");
      }
    };

    loadProfile();
  }, [token, dispatch]);

  // Redux 상태 변경 시 동기화
  useEffect(() => {
    setEditedUsername(user.username);
  }, [user.username]);

  // 2. 프로필 수정 API 호출
  const handleSaveChanges = async () => {
    try {
      const updatedProfile = await updateProfile({
        username: editedUsername,
        profileImageUrl: editedProfileImage,
      });

      console.log("Updated Profile:", updatedProfile);

      // Redux 상태 업데이트
      dispatch(updateUser(updatedProfile));

      setUsername(editedUsername);
      setProfileImage(editedProfileImage);
      setPreviewImage(editedProfileImage);

      // 수정 모드 종료
      setIsEditing((prevState) => ({
        ...prevState,
        username: false,
        profileImage: false,
      }));

      // 동기화
      setEditedUsername(updatedProfile.username);

      // 디버깅
      console.log(updatedProfile.username);
      console.log(email, username);
      console.log(editedUsername);

      alert("프로필이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));

      try {
        const updatedProfile = await updateProfile({ profileImageUrl: file });
        dispatch(updateUser(updatedProfile)); // Redux 상태 업데이트
        alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지를 업로드하는 데 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleImageReset = () => {
    setEditedProfileImage(null);
    setPreviewImage(defaultProfile);
  };

  const handleUsernameChange = (e) => {
    setEditedUsername(e.target.value);
    setMsg(""); // 입력이 변경될 때 메시지 초기화
    setIsUsernameChecked(false); // 중복 확인 초기화
  };

  const handleCheckNickname = async (e) => {
    e.preventDefault();

    try {
      const response = await checkUsername(editedUsername);
      if (response.result.duplicate === false) {
        setIsUsernameChecked(true);
        setMsg("사용 가능한 닉네임입니다.");
        console.log(response.result);
      } else {
        setIsUsernameChecked(false);
        setMsg("이미 사용 중인 닉네임입니다.");
        console.log(response.result);
      }
    } catch (error) {
      setMsg("닉네임 중복 확인 실패");
      console.error("닉네임 중복확인 실패", error.response?.message);
    }
  };

  const openTempPasswordModal = () => {
    dispatch(openModal("tempPassword"));
  };

  return (
    <React.Fragment>
      <Container>
        <ProfileSection>
          <ProfileLabel htmlFor="profileImage">
            <Preview src={previewImage || defaultProfile} alt="미리보기" />
            <ProfileInput
              type="file"
              accept="image/*"
              id="profileImage"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </ProfileLabel>
          <ProfileButton onClick={() => fileInputRef.current.click()}>
            이미지 업로드
          </ProfileButton>
          <ProfileButton onClick={handleImageReset}>이미지 제거</ProfileButton>
        </ProfileSection>

        <UserNameSection>
          <NameLabel>
            {isEditing.username ? (
              <>
                <Input>
                  <NameInput
                    type="text"
                    value={editedUsername}
                    onChange={handleUsernameChange}
                  />
                  {msg && <Message>{msg}</Message>}
                </Input>
                <ButtonBox>
                  <SaveButton
                    onClick={handleCheckNickname}
                    isUsernameChecked={isUsernameChecked}
                  >
                    확인
                  </SaveButton>
                  <SaveButton
                    onClick={handleSaveChanges}
                    disabled={!isUsernameChecked}
                  >
                    저장
                  </SaveButton>
                  <CancelButton
                    onClick={() => {
                      setEditedUsername(username);
                      setIsEditing({ ...isEditing, username: false });
                    }}
                  >
                    취소
                  </CancelButton>
                </ButtonBox>
              </>
            ) : (
              <>
                <Name>{username}</Name>
                <EditButton
                  onClick={() => setIsEditing({ ...isEditing, username: true })}
                >
                  수정
                </EditButton>
              </>
            )}
          </NameLabel>
        </UserNameSection>

        <UserEmailSection>
          <EmailTitle>이메일 주소</EmailTitle>
          <EmailLabel>
            <Email>{email}</Email>
          </EmailLabel>
          <SectionFooter>
            회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
          </SectionFooter>
        </UserEmailSection>

        <ActionSection>
          <ActionTitle>비밀번호 변경 및 회원 탈퇴</ActionTitle>
          <ActionButtonBox>
            <PwButton onClick={openTempPasswordModal}>비밀번호 변경</PwButton>
            {isModalOpen && modalType === "tempPassword" && <TempPasswordModal />}
            <DelButton>회원 탈퇴</DelButton>
          </ActionButtonBox>
          <SectionFooter>
            탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
          </SectionFooter>
        </ActionSection>
      </Container>
    </React.Fragment>
  );
}

export default MyPage;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 768px;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileLabel = styled.label`
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Preview = styled.img`
  border-radius: 50%;
  position: relative;
  object-fit: cover;
  width: 130px;
  height: 130px;
`;

const ProfileButton = styled.button`
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

const ProfileInput = styled.input`
  display: none;
`;

const UserNameSection = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
`;

const UserEmailSection = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`;

const NameLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameInput = styled.input`
  font-size: 1.5rem;
`;

const Message = styled.span`
  color: ${(props) => (props.isUsernameChecked ? "black" : "red")};
  font-size: 14px;
  margin-top: 14px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const EmailLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const EmailTitle = styled.h2`
  font-size: 1.3rem;
  padding-top: 20px;
`;

const Email = styled.span`
  font-size: 1rem;
  line-height: 1.5;
`;

const EditButton = styled.button`
  width: 70px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const SectionFooter = styled.p`
  font-size: 0.875rem;
  color: var(--text2);
`;

const SaveButton = styled.button`
  width: 70px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 70px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ActionSection = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

const ActionTitle = styled.h2`
  font-size: 1.2rem;
`;

const ActionButtonBox = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const PwButton = styled.button`
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

const DelButton = styled.button`
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
