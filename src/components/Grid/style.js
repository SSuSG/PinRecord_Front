import styled from "vue-styled-components";

export const GridWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100vh;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  /* background-color: gray; */
`;
