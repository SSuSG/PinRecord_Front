import styled from "vue-styled-components";

export const CommentListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 5px;
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

export const CommentInputWrapper = styled.div`
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
`;

export const SubmitButton = styled.button`
	padding: 5px 10px;
	border-radius: 5px;
	background-color: green;
	font-weight: 500;
	color: white;
`;
