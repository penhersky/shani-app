type Action = {
  type: string;
};

export type StateType = {};

export const initialState = {};

const settings = (
  state: StateType = initialState,
  action: Action,
): StateType => {
  switch (action.type) {
    default:
      return state;
  }
};

export default settings;
