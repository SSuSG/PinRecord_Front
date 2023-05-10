import styled from "vue-styled-components";

export const StyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* background: palevioletred; */
	/* background-color: aliceblue; */
	box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
	font-size: 1em;
	padding: 0.25em 1em;
	width: 100%;
	height: 70px;
	position: sticky;
`;

export const ButtonList = styled.ul`
	list-style: none;
`;
export const ButtonLi = styled.li`
	float: left;
	margin-left: 5px;
	padding: 8px 10px;
	/* background-color: royalblue; */
	color: white;
	border-radius: 10px;
	font-weight: 400;
`;
