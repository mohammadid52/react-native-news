import React, { useState, createContext, useContext, useEffect } from 'react';

import { readData } from '../storage';
import * as keys from '../keys';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [interests, setInterests] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const unsubscribe = () => {
      readData(keys.INTEREST).then((data) => setInterests(data));
      readData(keys.PROFILE_IMAGE).then((data) => setProfileImage(data));
    };
    return () => {
      unsubscribe();
    };
  }, [interests, profileImage]);

  // clearAll_TEST();

  return (
    <UserContext.Provider
      value={{ interests, profileImage, setInterests, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
