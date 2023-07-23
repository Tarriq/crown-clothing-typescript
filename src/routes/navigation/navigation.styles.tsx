import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

  @media screen and (max-width: 500px) {
    width: 80%;
    justify-content: space-evenly;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const DisplayName = styled.h2`
	font-weight: normal;
	translate: 0 8px;
	.name {
		font-weight: bold;
		display: inline-block;
		&::first-letter {
			text-transform: uppercase;
		}
	}
`