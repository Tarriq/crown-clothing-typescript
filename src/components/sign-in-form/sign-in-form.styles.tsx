import styled from 'styled-components';
import { SignUpContainer } from '../sign-up-form/sign-up-form.styles';

export const SignInContainer = SignUpContainer;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 50px;
	justify-content: center;
`;

export const InvalidInputError = styled.p`
	translate: 0 -30px;
	color: red;
`