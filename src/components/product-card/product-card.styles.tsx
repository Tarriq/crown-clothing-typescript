import styled from 'styled-components';

type ProductCardProps = {
	ownCategory?: boolean
}

export const ProductCardContainer = styled.div<ProductCardProps>`
  width: ${({ ownCategory }) => (ownCategory ? 'unset' : '350px')};
  min-width: ${({ ownCategory }) => (ownCategory ? '20vw' : 'unset')};
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }
  button {
    width: 80%;
    position: absolute;
    bottom: 35px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
  @media screen and (max-width: 800px) {
    button {
      display: block;
      opacity: 0.9;
      min-width: unset;
      padding: 0 10px;
    }

    &:hover {
      img {
        opacity: unset;
      }

      button {
        opacity: unset;
      }
    }
  }

  @media screen and (max-width: 450px) {
    width: 80vw;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  .name {
    width: 90%;
  }

  .price {
    width: 20%;
		text-align: end;
  }
`;
