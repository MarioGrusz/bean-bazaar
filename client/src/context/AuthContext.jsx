import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { createUserInDatabse } from '../api/apiUser';
import { getSessionCookie, logoutSession } from '../api/apiCookie';



const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  const createUser = async (email, password, name) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
    
      await updateProfile(auth.currentUser, { displayName: name }).catch(
        (err) => console.log(err)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async (email, password) => {
      
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      
      console.error('Sign-in error:', error);
    }
  };


  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      
      console.error('Google sign-in error:', error);
    }
  };   

  const logOut = () => {
    signOut(auth)
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {

        createUserInDatabse(currentUser);

        currentUser.getIdToken().then((idToken) => {
          getSessionCookie(idToken)
        });

      } else {
        logoutSession()
      }
    });

    return () => unsubscribe();
  }, []);


  const value = {
    createUser,
    signIn,
    googleSignIn,
    logOut,
    user,
    token,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
};

export const UserAuth = () => {
  return useContext(AuthContext);
};