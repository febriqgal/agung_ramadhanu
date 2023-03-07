import { createContext, useContext, useState } from "react";

export const InitialUserState = {
  email: null,
  uid: null,
  displayName: null,
  photoURL: null,
};

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = (props) => {
  const [userState, setUserState] = useState(InitialUserState);
  
  const SetUser = (userCredential) => {
    setUserState({ ...userCredential });
  };

  const ResetUser = () => {
    setUserState(InitialUserState);
  };

  const value = { ...userState, SetUser, ResetUser };
  return <UserContext.Provider value={value} {...props} />;
};