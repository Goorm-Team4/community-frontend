import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #BF4F74;
`;

export const ToggleContainer = styled.button`
  background-color: ${(props) => (props.$active ? '#4CAF50' : '#ccc')}; // 켜짐: 초록, 꺼짐: 회색
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.$active ? '#45a049' : '#bbb')};
  }
`;