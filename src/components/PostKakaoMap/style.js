import styled from "vue-styled-components";

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: center;
	gap: 15px;
	position: absolute;
	right: 30px;
	top: 50px;
	z-index: 2;
	background-color: white;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0px 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const ResultContainer = styled.div`
	height: 100%;
	width: 30%;
	min-width: 300px;
	background-color: rgba(0, 0, 0, 0.2);
	box-shadow: 0px 1px 1px 2px rgba(0, 0, 0, 0.3);
	position: absolute;
	top: 0;
	z-index: 2;
	overflow: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	z-index: 1;
	animation: slide 0.4s;
	@keyframes slide {
		from {
			transform: translateX(-300px);
		}
		to {
			transform: translateX(0px);
		}
	}
	::-webkit-scrollbar {
		display: none;
	}
`;

export const ResultWrapper = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: auto;
	padding: 10px;
`;

export const Result = styled.div`
	background-color: whitesmoke;
	width: 100%;
	min-height: 55px;
	border-radius: 5px;
	padding: 5px;
	font-weight: bold;
	font-size: 15px;
	text-align: center;
	display: flex;
	flex-direction: column;
	cursor: pointer;
	transition: all 0.3s;
	:hover {
		transform: scale(1.03);
	}
`;
export const SearchButton = styled.button`
	background-color: white;
	border: 1px solid black;
	padding: 3px;
	border-radius: 5px;
	font-size: 12;
`;
export const KeywordInput = styled.input`
	background-color: lightgrey;
	border-radius: 5px;
	padding: 5px;
`;
