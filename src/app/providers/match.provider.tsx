import {
  createContext,
  PropsWithChildren,
  useReducer,
  useContext,
  Dispatch,
} from 'react';

type MatchState = {
  isTicking: boolean;
  timeLeft: number;
  quarter: number;
};

type MatchActionType = 'changed' | 'reset' | 'end quarter';

type MatchAction = {
  type: MatchActionType;
  payload?: Partial<MatchState>;
};

const MatchContext = createContext<MatchState | null>(null);
const MatchDispatchContext = createContext<Dispatch<MatchAction> | null>(null);

const initialState: MatchState = {
  isTicking: false,
  timeLeft: 600,
  quarter: 1,
};

const matchReducer = (state: MatchState, { type, payload }: MatchAction) => {
  switch (type) {
    case 'changed':
      return { ...state, ...payload };
    case 'end quarter':
      return {
        ...initialState,
        quarter: state.quarter + 1,
      };
    case 'reset': {
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
};

export const MatchProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(matchReducer, initialState);
  return (
    <MatchContext.Provider value={state}>
      <MatchDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDispatchContext.Provider>
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const match = useContext(MatchContext);
  if (!match) {
    throw new Error('Unable to find a match context');
  }
  return match;
};

export const useMatchDispatch = () => {
  const matchDispatch = useContext(MatchDispatchContext);
  if (!matchDispatch) {
    throw new Error('Unable to find a match dispatch context');
  }
  return matchDispatch;
};
