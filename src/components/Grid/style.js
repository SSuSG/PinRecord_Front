import styled from "vue-styled-components";

export const GridWrapper = styled.div`
	margin: 0 auto;
	width: 80%;
	height: 100%;
	padding: 20px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 350px);
	grid-template-rows: repeat(auto-fill, 300px);
	justify-content: center;
	grid-column-gap: 20px;
	grid-row-gap: 25px;
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
	height: 100%;
	width: 100%;

	padding: 20px 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	letter-spacing: 1px;
`;

export const CountInfo = styled.div`
	display: flex;
	width: 100%;
	align-items: start;
	justify-content: end;
	padding-right: 10px;
	gap: 10px;
	font-weight: bold;
`;
export const TextInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: end;
	gap: 2px;
`;
