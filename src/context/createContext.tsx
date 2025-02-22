import { createContext, ReactNode, useContext, useReducer } from "react";
import { User } from "./users.types";

interface StateType {
  userData: {
    data: User[];
    isLoading?: boolean;
    error?: string | null;
  };
  formField: object;
}

const defaultState = {
  userData: { data: [], isLoading: true, error: null },
  formField: {},
};

enum ActionKeys {
  SET_DATA = "SET_DATA",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_FORM_FIELD = "SET_FORM_FIELD",
}

type ActionType = {
  type: ActionKeys.SET_DATA;
  payload: {
    data: User[];
    isLoading?: boolean;
    error?: any | null;
  };
};

interface UsersContextType extends StateType {
  dispatch: (value: ActionType) => void;
}

const UsersContext = createContext<UsersContextType>({
  ...defaultState,
  dispatch: (value) => {},
});

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionKeys.SET_DATA:
      return { ...state, userData: { ...state.userData, ...action.payload } };
    default:
      return state;
  }
};

const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsersContext = () => {
  const context = useContext(UsersContext);
  return context;
};

export { useUsersContext, ActionKeys, UsersContextProvider };
