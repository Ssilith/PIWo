import React, { createContext, useState } from 'react';
import { auth, gitProvider, googleProvider } from './config';
import { signOut, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const users = [
    { email: 'usermail1@gmail.com', password: 'pass1', name: 'Jan', surname: 'Kowalski' },
    { email: 'usermail2@gmail.com', password: 'pass2', name: 'Pawel', surname: 'Nowak' },
    { email: 'usermail3@gmail.com', password: 'pass3', name: 'Piotr', surname: 'Kowal' },
  ];

  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem('user');
  });

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    setUser(user);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.error(error);
    }
  };

  const githubLogin = async () => {
    try {
      const res = await signInWithPopup(auth, gitProvider);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, googleLogin, githubLogin }}>
      {children}
    </AuthContext.Provider>
  );
};