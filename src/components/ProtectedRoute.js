import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isPasswordChange } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 로그인 상태 확인
  useEffect(() => {
    // 보호된 페이지에 접근 시 로그인 상태 확인 후 로그인 모달 표시
    if (!isLoggedIn && !isPasswordChange) {
      dispatch(openModal("login"));
    }
    if (!isLoggedIn && isPasswordChange) {
      dispatch(openModal("tempLogin"));
    }
    if (isLoggedIn && isPasswordChange) {
      dispatch(openModal("changePassword"));
    }
  }, [isLoggedIn, isPasswordChange, dispatch]);

  // 로그인 상태 아닐 때 페이지 렌더링 하지 않음
  if (!isLoggedIn) {
    return null;
  }

  // 로그인 상태일 때만 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
