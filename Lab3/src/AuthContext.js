import React, { createContext, useState, useEffect } from 'react';
import { auth, gitProvider, googleProvider } from './config';
import { signOut, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, reload } from "firebase/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password, displayName) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await updateProfile(auth.currentUser, { displayName: displayName });
        await reload(res.user);
        setUser({ ...res.user, displayName: displayName });
      }
    } catch (error) {
      console.error(error);
    }
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
    <AuthContext.Provider value={{ user, login, logout, googleLogin, githubLogin, register }}>
      {children}
    </AuthContext.Provider>
  );
};