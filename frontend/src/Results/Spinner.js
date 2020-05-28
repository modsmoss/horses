import React from "react";
import styled, { keyframes } from "styled-components";

const ellipsis = keyframes`
   to {
       width: 1.6em;
   } 
`;

const Loading = styled.div`
  display: flex;
  &:after {
    content: "...";
    overflow: hidden;
    width: 0;
    display: block;
    animation: ${ellipsis} steps(5, end) 1.1s infinite;
    margin-left: 0.1em;
  }
`;

const Spinner = ({ message }) => {
  return <Loading>{message || "Waiting"}</Loading>;
};

export default Spinner;
