import styled, { css } from "styled-components";

const largeDirectoryStyles = css`
  height: 380px;
`;
export const BackgroundImage = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
`;

export const DirectoryItemBodyContainer = styled.div`
  position: absolute;
  background-color: white;
  padding: 0 25px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  opacity: 0.7;

  h2 {
    font-weight: bold;
    margin: 0 6px 0;
    font-size: 22px;
    color: #4a4a4a;
  }

  p {
    font-weight: lighter;
    font-size: 16px;
  }
`;

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  height: 240px;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 10px 15px;
  overflow: hidden;
  ${({ large }) => large && largeDirectoryStyles};
  &:hover {
    cursor: pointer;

    & .${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
    & ${DirectoryItemBodyContainer} {
      opacity: 0.9;
      transition: opacity 0.2s ease-in-out;
    }
  }

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-right: 7.5px;
  }
`;
