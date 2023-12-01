import PropTypes from 'prop-types';
import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../firebase/firebase.config';
import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  
  const googleProvider = new GoogleAuthProvider();
  
  // Login email password 
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword (auth, email, password);
  }

  // Google login 
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup (auth, googleProvider);
  }

  // User login 
  const signin = (email, password) => {
    setLoading(true);
  return signInWithEmailAndPassword(auth, email, password);
  }

  // User logout 
  const signout = () => {
    setLoading(true);
    return signOut(auth);
  }

  // Update User 
  const manageProfile = (name, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // const userEmail = currentUser?.email || user?.email;
      // const loggedUser = {email: userEmail}
      setUser(currentUser);
      setLoading(false);
      // console.log(currentUser);
 /*      if(currentUser) {
        axios.post('https://elearn-platform-server.vercel.app/jwt', loggedUser, {withCredentials:true})
        .then(res =>{
          console.log("Token response", res.data);
        })
      }

      else{
        axios.post('https://elearn-platform-server.vercel.app/logout', loggedUser, {withCredentials:true})
        .then(res => {
          console.log(res.data);
        })
      } */
    })
    return () => {
      unSubscribe();
    }
  }, [user?.email])

  const authInfo = {
    user,
    loading,
    createUser,
    googleLogin,
    signin,
    signout,
    manageProfile,
  }
  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
}
export default AuthProvider;