import React, {useState} from "react";
import {reactLocalStorage} from 'reactjs-localstorage';

export const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
 const [userStatus, setUserStatus] = useState('loggedout')
 const [user, setUserName] = useState(
    reactLocalStorage.getObject('user')
 )

  return (
    <AppContext.Provider
      value={{
        userStatus,
        setUserStatus,
        setUserName,
        user
      }}
    >
      {children}
    </AppContext.Provider>
  );
};