import React, { useEffect, useReducer, useState } from "react";
import socketIo from "socket.io-client";

import { reducer } from "./reducer";
import ResultsTable from "./ResultsTable";
import Spinner from "./Spinner";

const Results = () => {
  const [results, dispatch] = useReducer(reducer, {
    status: "",
    horses: [],
  });

  const [raceCount, setRaceCount] = useState(0);

  useEffect(() => {
    const socket = socketIo(process.env.REACT_APP_API_URI);
    socket.on("update", data => {
      console.log("Data", data);
      if (data.raceCount > raceCount) {
        console.log("about to flush");
        setRaceCount(data.raceCount);
        dispatch({ type: "flush" });
      }
      dispatch({ type: data.event, horse: data.horse, time: data.time });
    });
    return () => {
      socket.close();
    };
  }, [raceCount]);

  console.log(results);

  return results.horses && results.horses.length ? (
    <ResultsTable horses={results.horses} raceCount={raceCount}></ResultsTable>
  ) : (
    <Spinner></Spinner>
  );
};

export default Results;
