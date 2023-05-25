import styled from "vue-styled-components";

export const DateInput = styled.input`
	width: 120px;
	height: 100%;
	border: 1px solid black;
	border-radius: 5px;
	padding: 3px;
	font-weight: bold;
`;
export const TextInput = styled.input`
	width: 100%;
	height: 40px;
	border: 1px solid black;
	border-radius: 5px;
	padding: 10px;
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;
export const CommentInput = styled.textarea`
	width: 100%;
	height: 100px;
	border: 1px solid black;
	border-radius: 5px;
	padding: 10px;
	resize: none;
`;
export const PinContainer = styled.div`
	background-color: lightgrey;
	border-radius: 10px;
	min-height: 300px;
	max-height: 500px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	overflow: auto;
	gap: 10px;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	::-webkit-scrollbar {
		display: none;
	}
`;
export const PinData = styled.div`
	border-radius: 10px;
	min-height: 80px;
	padding: 10px;
	background-color: white;
	font-weight: bold;
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
export const PinDataInfo = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
`;
export const HashTagContainer = styled.div`
	width: 100%;
	text-overflow: ellipsis;
	display: flex;
	justify-content: center;
	gap: 10px;
`;

export const HashTagSpan = styled.span`
	font-size: 15px;
	color: #8a8a8a;
`;
