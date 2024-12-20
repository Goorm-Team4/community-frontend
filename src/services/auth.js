import axios from "axios";
import { loginUser } from "../redux/userSlice";

export const emailLogin = async (email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// 이메일 입력 후 인증 코드 요청
export const onValidMail = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/auth/email/verification`,
      {},
      {
        params: { email },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("인증 코드 전송 실패: ", error);
    throw error;
  }
};

// 인증 코드 검증
export const onValidCode = async (email, authCode) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/auth/email/verification`,
      {
        params: { email, authCode },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("인증 코드 검증 실패: ", error);
    throw error;
  }
};

export const checkUsername = async (username) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/auth/username/validation`,
      {
        params: { username },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("닉네임 중복체크 실패: ", error);
    throw error;
  }
};

export const emailSignup = async (info, imageFile) => {
  const formData = new FormData();
  formData.append(
    "info",
    new Blob([JSON.stringify(info)], { type: "application/json" })
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/auth/signup`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 실패: ", error.response?.data || error.message);
    throw error;
  }
};

export const storeLogin = async (dispatch, location, navigate) => {
  const accessToken =
    localStorage.getItem("accessToken") ||
    new URLSearchParams(location.search).get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      
      try {
        const profile = await fetchProfile();

        dispatch(loginUser({
          email: profile.email,
          username: profile.username,
          profileImageUrl: profile.profileImageUrl || null,
          accessToken,
        }));

        // userState를 localStorage에 저장
        localStorage.setItem('userState', JSON.stringify({
          email: profile.email,
          username: profile.username,
          profileImageUrl: profile.profileImage || null,
          accessToken: accessToken,
          isLoggedIn: true,
        }));

        // 카카오 로그인 시 URL의 accessToken 제거
        if (new URLSearchParams(location.search).get("accessToken")) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("프로필 정보를 불러오는 데 실패했습니다.", error);
      }
  }
};

// 프로필 조회
export const fetchProfile = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/members/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  const { email, username, profileImageUrl } = response.data.result;
  return {
    email,
    username,
    profileImageUrl, 
  };
};


// 프로필 수정
export const updateProfile = async ({ username, profileImageUrl }) => {
  const formData = new FormData();

  const jsonReq = JSON.stringify({ username });
  formData.append("request", new Blob([jsonReq], { type: "application/json" }));
  
  if (profileImageUrl instanceof File) {
    formData.append("image", profileImageUrl);
  }

  const token = localStorage.getItem("accessToken");

  try {
    console.log("보내는 데이터: ", [...formData.entries()]);

    const response = await axios.patch(
      `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/members/me`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.result;

  } catch (error) {
    console.error("프로필 수정 실패: ", error.response?.data || error.message);
    throw error;
  }
};