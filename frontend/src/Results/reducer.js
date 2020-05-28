const reducer = (state, action) => {
  switch (action.type) {
    case "flush":
      return {
        ...state,
        status: "start",
        horses: [],
      };
    case "start":
      return {
        ...state,
        status: action.type,
        horses: [...state.horses, action.horse],
      };
    case "finish":
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
