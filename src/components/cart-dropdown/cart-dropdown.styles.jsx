import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  top: 90px;
  right: 0px;
  height: 320px;
  width: 250px;
  display: flex;
  flex-direction: column;
  z-index: 5;
  background-color: white;
  border: 1px solid black;
  padding: 20px;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton}: {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 16px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
