import React, { useEffect, useRef, useState } from "react";
import * as Styles from "../styles/MyPageStyles";
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

  const handleImageReset = async () => {
    try {
      setEditedProfileImage(null);
      setPreviewImage(defaultProfile);

      const updatedProfile = await updateProfile({ profileImageUrl: null });
      dispatch(updateUser(updatedProfile));
      alert("프로필이 변경되었습니다.");
    } catch (error) {
      console.error("이미지 제거 실패: ", error);
      alert("프로필 이미지를 변경하는 데 실패했습니다. 다시 시도해주세요.");
    }
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
      <Styles.Container>
        <Styles.ProfileSection>
          <Styles.ProfileLabel htmlFor="profileImage">
            <Styles.Preview src={previewImage || defaultProfile} alt="미리보기" />
            <Styles.ProfileInput
              type="file"
              accept="image/*"
              id="profileImage"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </Styles.ProfileLabel>
          <Styles.ProfileButton onClick={() => fileInputRef.current.click()}>
            이미지 업로드
          </Styles.ProfileButton>
          <Styles.ProfileButton onClick={handleImageReset}>이미지 제거</Styles.ProfileButton>
        </Styles.ProfileSection>

        <Styles.UserNameSection>
          <Styles.NameLabel>
            {isEditing.username ? (
              <>
                <Styles.Input>
                  <Styles.NameInput
                    type="text"
                    value={editedUsername}
                    onChange={handleUsernameChange}
                  />
                  {msg && <Styles.Message>{msg}</Styles.Message>}
                </Styles.Input>
                <Styles.ButtonBox>
                  <Styles.SaveButton
                    onClick={handleCheckNickname}
                    isUsernameChecked={isUsernameChecked}
                  >
                    확인
                  </Styles.SaveButton>
                  <Styles.SaveButton
                    onClick={handleSaveChanges}
                    disabled={!isUsernameChecked}
                  >
                    저장
                  </Styles.SaveButton>
                  <Styles.CancelButton
                    onClick={() => {
                      setEditedUsername(username);
                      setIsEditing({ ...isEditing, username: false });
                    }}
                  >
                    취소
                  </Styles.CancelButton>
                </Styles.ButtonBox>
              </>
            ) : (
              <>
                <Styles.Name>{username}</Styles.Name>
                <Styles.EditButton
                  onClick={() => setIsEditing({ ...isEditing, username: true })}
                >
                  수정
                </Styles.EditButton>
              </>
            )}
          </Styles.NameLabel>
        </Styles.UserNameSection>

        <Styles.UserEmailSection>
          <Styles.EmailTitle>이메일 주소</Styles.EmailTitle>
          <Styles.EmailLabel>
            <Styles.Email>{email}</Styles.Email>
          </Styles.EmailLabel>
          <Styles.SectionFooter>
            회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
          </Styles.SectionFooter>
        </Styles.UserEmailSection>

        <Styles.ActionSection>
          <Styles.ActionTitle>비밀번호 변경 및 회원 탈퇴</Styles.ActionTitle>
          <Styles.ActionButtonBox>
            <Styles.PwButton onClick={openTempPasswordModal}>비밀번호 변경</Styles.PwButton>
            {isModalOpen && modalType === "tempPassword" && <TempPasswordModal />}
            <Styles.DelButton>회원 탈퇴</Styles.DelButton>
          </Styles.ActionButtonBox>
          <Styles.SectionFooter>
            탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
          </Styles.SectionFooter>
        </Styles.ActionSection>
      </Styles.Container>
    </React.Fragment>
  );
}

export default MyPage;