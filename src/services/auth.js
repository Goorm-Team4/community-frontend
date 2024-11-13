import axios from "axios";
import { loginUser } from "../redux/userSlice";

export const emailLogin = async (email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`,
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
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/email/verification`,
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
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/email/verification`,
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
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/username/validation`,
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
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/signup`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 실패: ", error.response?.data || error.message);
    throw error;
  }
};

// accessToken 저장
export const storeLogin = (dispatch, location, navigate) => {
    const accessToken = localStorage.getItem('accessToken') || new URLSearchParams(location.search).get("accessToken");

    if (accessToken) {
      dispatch(loginUser({ accessToken }));
  
      // 카카오 로그인 시 URL의 accessToken 제거
      if (!localStorage.getItem('accessToken')) {
        localStorage.setItem('accessToken', accessToken);
        navigate("/", { replace: true });
      }
    }
  };