import styled from "vue-styled-components";

export const CommentListWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	/* justify-content: space-between; */
	gap: 5px;
	max-height: 440px;
	overflow: auto;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	::-webkit-scrollbar {
		display: none;
	}
`;

export const CommentWrapper = styled.div`
	border-radius: 5px;
	padding: 5px;
	background-color: white;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
`;

export const AvatarWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const CommentContent = styled.span`
	width: 63%;
	text-overflow: ellipsis;
	text-align: start;
`;

export const CommentInputWrapper = styled.div`
	padding: 5px 0;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const CommentInput = styled.input`
	border: 1px solid grey;
	border-radius: 5px;
	padding: 5px;
	font-size: 15px;
	height: 60px;
	transition: 0.2s ease-in-out;
	:focus {
		border: 2px solid royalblue;
	}
`;

export const SubmitButton = styled.button`
	padding: 5px 10px;
	border-radius: 5px;
	background-color: royalblue;
	font-weight: 500;
	color: white;
`;

export const EditButton = styled.button`
	padding: 5px 10px;
	background-color: Gainsboro;
	color: black;
	font-size: 12px;
	font-weight: bold;
	border-radius: 10px;
	transition: 0.1s ease-in-out;
	:hover {
		background-color: green;
		color: white;
	}
`;

export const DeleteButton = styled.button`
	padding: 5px 10px;
	background-color: Gainsboro;
	color: black;
	font-size: 12px;
	font-weight: bold;
	border-radius: 10px;
	transition: 0.1s ease-in-out;
	:hover {
		background-color: Orangered;
		color: white;
	}
`;

export const EditInput = styled.input`
	border-radius: 2px;
	padding: 5px;
	height: 30px;
	width: 400px;
	border: 1px solid Gainsboro;
`;
