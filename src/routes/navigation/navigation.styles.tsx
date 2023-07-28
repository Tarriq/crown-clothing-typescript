import styled from 'styled-components';
import { Link } from 'react-router-dom';

type DisplayNameProps = {
	showName: boolean
}

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  padding: 20px;
	display: flex;
	align-items: center;
	gap: 70px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    width: 80%;
    justify-content: space-evenly;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const DisplayName = styled.h2<DisplayNameProps>`
  position: absolute;
  top: 0;
  right: 50%;
  translate: 50%;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  background-color: hsl(60, 55.5%, 90%);
  padding: 10px;
  border-radius: 0 0 13px 13px;
  z-index: 1;
  transition: translate 0.3s;

  .material-icons {
    color: #3d3d3d;

  }
  .name {
    font-size: large;
    display: inline-block;
    &::first-letter {
      text-transform: uppercase;
    }
  }

  @media screen and (max-width: 600px) {
    right: 0;
    top: 25px;
    translate: calc(100% - 38px);
    border-radius: 30px 0 0 30px;
		animation: ${({ showName }) => showName && 'showName 2s linear'};
  }
`;