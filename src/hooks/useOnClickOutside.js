// 특정 요소 외부 클릭 시 지정된 핸들러 호출하는 훅
import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }

            // 영역 밖 클릭 시 핸들러 호출 ex. 모달 닫기 함수
            handler();
        };

        // 마우스클릭 & 터치 이벤트 등록하여 외부 클릭 감지
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        // 컴포넌트 제거될 때 리스너 제거
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;