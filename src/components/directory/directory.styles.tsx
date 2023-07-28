import styled from 'styled-components';

export const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;

	@media screen and (max-width: 450px) {
		flex-flow: column;
	}
`;
