import React, { useEffect } from 'react'
import Navbar from "./components/Navbar"
import { getToken } from "./utils/getToken"
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';

// sending cookies with every reqest
axios.defaults.withCredentials = true;

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);

  // post api call to login
  const onLogin = async (email: string, password: string) => {
    // console.log(email, password)
    try {
      const { data } = await axios.post("/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (data.success) {
        console.log(data.message)
        setIsAuthenticated(true);
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  // post api call to add new user
  const onRegister = async (name: string, email: string, password: string) => {
    // console.log(name, email, password)
    try {
      const { data } = await axios.post("/api/user/new",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (data.success) {
        console.log(data.message)
        setIsAuthenticated(true);
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  // post api call to logout
  const onLogout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout")
      if (data.success) {
        console.log(data.message)
        setIsAuthenticated(false);
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


  useEffect(() => {
    const token = getToken(); // check for user authentication

    if (token) {
      setIsAuthenticated(true);
    }

  }, [])


  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      {
        isAuthenticated ? <Dashboard /> : isLogin ?
          <Login setIsLogin={setIsLogin} onLogin={onLogin} /> :
          <Signup setIsLogin={setIsLogin} onRegister={onRegister} />
      }
    </>
  )
}

export default App
