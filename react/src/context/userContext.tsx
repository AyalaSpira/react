import  { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';
import userReducer, { UserData, Action } from '../reduser/rreducerUser';

const UserContext = createContext<[UserData[], Dispatch<Action>]>([[], () => {}]);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, dispatch] = useReducer(userReducer, [] as UserData[]);

  return (
    <UserContext.Provider value={[users, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);

export default UserContext;
