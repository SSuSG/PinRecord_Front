import styled from "vue-styled-components";

export const StyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
	font-size: 14px;
	padding: 20px 50px;
	width: 100vw;
	height: 70px;
	position: fixed;
	top: 0;
	z-index: 99;
`;

export const ButtonList = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const ButtonLi = styled.div`
	border-radius: 10px;
	font-weight: 500;
`;
