import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

	@media screen and (max-width: 900px) {
		button {
			margin-inline: auto;
		}
	}
`;
