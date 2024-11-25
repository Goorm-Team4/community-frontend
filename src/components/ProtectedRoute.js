import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // 보호된 페이지에 접근 시 로그인 상태 확인 후 로그인 모달 표시
    if (!isLoggedIn) {
      dispatch(openModal("login"));
    }
  }, [isLoggedIn, dispatch]);

  // 로그인 상태 아닐 때 페이지 렌더링 하지 않음
  if (!isLoggedIn) {
    return null;
  }

  // 로그인 상태일 때만 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
