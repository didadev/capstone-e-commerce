import styled, { css } from "styled-components";

const mainColor = "black";
const subColor = "grey";

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormGroupLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 5px;
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  pointer-events: none;
  transition: all 300ms ease;
  ${({ shrink }) => shrink && shrinkLabelStyles}
`;

export const FormGroupInput = styled.input`
    padding: 10px 10px 10px 5px;
    margin: 25px 0;
    background: none;
    background-color: white;
    color: ${subColor};
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${subColor};
    font-size: 18px;
    display: block;
    width: 100%;

    &:focus {
      outline: none;
    }

    &:focus ~ ${FormGroupLabel} {
      ${shrinkLabelStyles}
    }
  }`;

export const FormGroup = styled.div`
  position: relative;
  margin: 45px 0;

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;
