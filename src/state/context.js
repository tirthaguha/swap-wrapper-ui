import { createContext, useContext, useReducer } from "react"


export const UserContext = createContext({})

export const ACTIONS = Object.freeze({
  SET_USERNAME:"set_username",
  SET_TOKEN:"set_token"
});

function rentReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USERNAME: {
      return { ...state, username: action.data }
    }
    case ACTIONS.SET_TOKEN: {
      return { ...state, token: action.data }
    }
    
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rentReducer, {
    username: "",
    token: "",
  });

  const context = { state, dispatch };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const WithContext = (WrappedComponent) => {
  return function WrappedFunction(props) {
    const context = useContext(UserContext)
    const { state, dispatch } = context
    return (
      <>
        <WrappedComponent state={state} dispatch={dispatch} {...props} />
      </>
    );
  };
};