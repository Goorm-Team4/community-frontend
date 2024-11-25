import React, { useEffect } from "react";
import styled from "styled-components";
const Timer = ({ count, setCount }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (count <= 0) return; // 타이머 종료 조건
    const id = setInterval(() => setCount((prevCount) => prevCount - 1), 1000);

    return () => clearInterval(id);
  }, [count, setCount]);

  return (
    <TimerContainer>
      <TimerText>{formatTime(count)}</TimerText>
    </TimerContainer>
  );
};

export default Timer;

const TimerContainer = styled.div`
  padding: 8px;
  text-align: center;
`;

const TimerText = styled.span`
  color: #343a40;
  font-size: 15px;
  font-weight: 700;
`;
