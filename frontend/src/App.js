import React from "react";
import styled from "styled-components";
import Results from "./Results";

const Main = styled.div`
  padding: 3rem;
`;

function App() {
  return (
    <Main>
      <h2>Race results</h2>
      <Results></Results>
    </Main>
  );
}

export default App;
