import styled from 'styled-components';
import { SignUpContainer } from '../../components/sign-up-form/sign-up-form.styles';

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 900px) {
    width: 100%;
    flex-flow: column;
    gap: 70px;
    align-items: center;

    ${SignUpContainer} {
      width: 100%;
      max-width: 500px;

      h2 {
        text-align: center;
      }
    }
  }
`;
