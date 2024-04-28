// UserContext.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[ready,setReady]=useState(false);
  useEffect(()=>{

    if(!user){

        const {data}=axios.get('/profile').then(({data})=>{

            setUser(data)
            setReady(true)

        })
        
    }




  })

  return (
    <UserContext.Provider value={{ user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  );
};
