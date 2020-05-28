import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 30rem;
  td,
  th {
    padding: 0.8rem;
    border: 1px solid black;
    text-align: right;
    &:nth-of-type(2) {
      text-align: left;
    }
  }
`;

const ResultsTable = ({ horses, raceCount }) => {
  const h = horses
    .sort((a, b) => {
      if (!a.time && b.time) {
        return 1;
      }
      if (!b.time && a.time) {
        return -1;
      }
      return a.time - b.time;
    })
    .map(horse => {
      if (horse.time > 0) {
        horse = { ...horse, time: `${(horse.time / 1000).toFixed(1)}s` };
      }
      return horse;
    });
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>No</th>
          <th>Horse</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {(h &&
          h.length &&
          h.map(horse => {
            return (
              <tr key={`race-${raceCount}-${horse.id}`}>
                <td>{horse.id}</td>
                <td>{horse.name}</td>
                <td>{horse.time || ""}</td>
              </tr>
            );
          })) || <tr></tr>}
      </tbody>
    </StyledTable>
  );
};

export default ResultsTable;
