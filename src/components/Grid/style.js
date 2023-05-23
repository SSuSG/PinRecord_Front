import styled from "vue-styled-components";

export const GridWrapper = styled.div`
	margin: 0 auto;
	width: 80%;
	height: 100vh;
	padding: 20px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 350px);
	grid-column-gap: 10px;
	justify-content: center;
	column-gap: 20px;
`;

export const GridBox = styled.div`
	height: 300px;
	border-radius: 10px;
	background-color: aliceblue;
	overflow: hidden;
	position: relative;
	transition: 0.2s ease-in-out;
	box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
	:hover {
		transform: scale(1.02);
	}
`;

export const ImgBox = styled.img`
	width: 100%;
	height: 100%;
	overflow: auto;
`;

export const OverlayInfoWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: start;
	transition: 0.2s ease-in-out;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
	:hover {
		background-color: rgba(0, 0, 0, 0.6);
	}
	color: white;
	font-size: 14px;
	font-weight: 400;
`;

export const OverlayInfo = styled.div`
	padding: 20px 10px;
	display: flex;
	flex-direction: column;
	align-items: start;
	letter-spacing: 1px;
`;
