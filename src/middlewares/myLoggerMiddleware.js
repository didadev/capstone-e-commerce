export const myLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);
  console.log("Action Type: ", action.type);
  console.log("Action payload: ", action.payload);
  console.log("current state : ", store.getState());
  next(action);
  console.log("Next state ", store.getState());
};
