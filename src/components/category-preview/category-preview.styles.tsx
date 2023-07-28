import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

`;

export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
	display: block;
	margin: 0;

  &:hover {
    opacity: 0.5;
  }

  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
	min-height: 365px;

  ::-webkit-scrollbar {
    display: none;
  }
  overflow-x: scroll;
`;
