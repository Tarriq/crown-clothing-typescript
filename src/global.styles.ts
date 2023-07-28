import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
	::-webkit-scrollbar {
		width: 15px;
	}

	::-webkit-scrollbar-thumb {
		background: hsl(0, 0%, 20%);
		border-radius: 100vw;
		border: 0.20em solid white;
	}

	body {
		font-family: 'open sans';
		padding: 28px 48px;
		overflow: overlay;
		margin: 0;
		overflow-x: hidden;
		

		@media screen and (max-width: 750px) {
			padding: 10px;
		}

		@media screen and (max-width: 450px) {
			padding: 0;
		}
	}
	a {
		text-decoration: none;
		color: black;
	}

	p::first-letter {
		text-transform: uppercase;
	}

	* {
		box-sizing: border-box;
	}

	@keyframes showName {
		10% {
			translate: 0;
		}

		90% {
			translate: 0;
		}

		100% {
			translate: calc(100% - 38px);
		}
	}
`;

export default GlobalStyles;
