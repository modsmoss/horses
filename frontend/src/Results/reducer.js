const reducer = (state, action) => {
  switch (action.type) {
    case "flush":
      console.log("FLUSH");
      return {
        ...state,
        status: "start",
        horses: [],
      };
    case "start":
      console.log("START");
      return {
        ...state,
        status: action.type,
        horses: [...state.horses, action.horse],
      };
    case "finish":
      console.log("FINISH");
      return {
        ...state,
        status: action.type,
        horses: state.horses.map(horse => {
          if (horse.id === action.horse.id) {
            return {
              ...horse,
              time: action.time,
            };
          } else {
            return horse;
          }
        }),
      };
    default:
      console.error("Undefined action type");
  }
};

export { reducer };
