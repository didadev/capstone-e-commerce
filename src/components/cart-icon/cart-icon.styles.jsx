import styled from "styled-components";
import { ReactComponent as ShoppingSVGBag } from "../../assets/shopping-bag.svg";

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ShoppingIcon = styled(ShoppingSVGBag)`
  width: 24px;
  height: 24px;
`;

export const ItemCount = styled.span`
  position: absolute;
  bottom: 12px;
  font-weight: bold;
  font-size: 10px;
`;
