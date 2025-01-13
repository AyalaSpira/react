import React, { createContext, useReducer } from "react";
import userReducer, { UserData } from "../reduser/rreducerUser";
import Login from "./Login";
import UserNameAvatar from "./username+avatar";


export type UserContextType = {
  user: UserData[];
  userDispatch: React.Dispatch<any>;
  currentUser: UserData | null;
};


export const UserContext = createContext<UserContextType | null>(null);

const HomePage = () => {
  const initialUser: UserData[] = [
    {
      name: "sod",
      lname: "",
      email: "",
      password: "1234",
      addres: "",
      phone: "",
    },
  ];
  const [user, userDispatch] = useReducer(userReducer, initialUser);
  const [currentUser, setCurrentUser] = React.useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const handleLogin = (user: UserData) => {
    setCurrentUser(user); 
    setIsLoggedIn(true); 
  };
  return (
    <UserContext.Provider value={{ user, userDispatch, currentUser }}>
      {isLoggedIn ? <UserNameAvatar /> : <Login login={handleLogin} />}
    </UserContext.Provider>
  );
};

export default HomePage;
