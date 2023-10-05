import React, { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("awesomeLeadsToken"));
  const [user, setUser] = useState(null); // You can store user data here

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("/api/users/me", requestOptions); // Use Axios for the API request

        if (response.status === 200) {
          // Store user data in the state
          setUser(response.data);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setToken(null);
      }
      localStorage.setItem("awesomeLeadsToken", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ token, user, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
};
