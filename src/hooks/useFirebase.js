import { useEffect, useState } from 'react';
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   updateProfile,
   getIdToken,
} from 'firebase/auth';
import initializeFirebase from '../firebase/firebase.config';
import { saveUserInfo } from '../helpers/saveUserInfo';
import { axiAuth } from '../helpers/axiosInstance';

//? initializing firebase app
initializeFirebase();

const useFirebase = () => {
   const [user, setUser] = useState(null);
   const [userLoading, setUserLoading] = useState(true);
   const [authError, setAuthError] = useState('');
   const [admin, setAdmin] = useState(false);

   const auth = getAuth();

   //@ REGISTER WITH EMAIL AND PASS
   const registerWithEmailAndPassword = async (
      userName,
      email,
      password,
      history
   ) => {
      try {
         setUserLoading(true);
         setAuthError('');

         // register user
         await createUserWithEmailAndPassword(auth, email, password);
         // update user profile
         await updateProfile(auth.currentUser, {
            displayName: userName,
         });

         saveUserInfo(userName, email, 'POST');

         // redirect to home page
         history.push('/');
      } catch (error) {
         if (error.message.includes('auth/email-already-in-use')) {
            setAuthError('Email already in use!');
         }
      } finally {
         setUserLoading(false);
      }
   };

   //@ SIGN IN  WITH EMAIL AND PASS
   const loginWithEmailAndPassword = async (
      email,
      password,
      location,
      history
   ) => {
      try {
         setUserLoading(true);
         await signInWithEmailAndPassword(auth, email, password);
         setAuthError('');
         location?.state?.from
            ? history.push(location.state.from.pathname)
            : history.push('/');
      } catch (error) {
         if (error.message.includes('auth/user-not-found')) {
            setAuthError('No user found with this email 😟');
         } else if (error.message.includes('auth/wrong-password')) {
            setAuthError('Wrong password 😟');
         } else {
            setAuthError(error.message);
         }
      } finally {
         setUserLoading(false);
      }
   };

   //@ LOGOUT USER
   const logoutUser = () => {
      signOut(auth).then(() => {
         console.log('User Logged Out');
      });
   };

   //@ OBSERVING AUTH STATE CHANGES
   useEffect(() => {
      const unSubscribe = onAuthStateChanged(
         auth,
         (user) => {
            if (user) {
               setUser(user);
               getIdToken(user).then((token) => {
                  localStorage.setItem('idToken', token);
               });
            } else {
               setUser(null);
            }
            setUserLoading(false);
         },
         (err) => {
            console.log(
               'Error from auth state changed error callback',
               err.message
            );
            setAuthError(err.message);
         }
      );

      return () => unSubscribe;
   }, [auth]);

   useEffect(() => {
      if (user) {
         setUserLoading(true);
         axiAuth.get(`/users/${user?.email}`).then(({ data }) => {
            setAdmin(data?.role ? data.role === 'admin' : false);
            setUserLoading(false);
         });
      }
   }, [user]);

   return {
      user,
      admin,
      userLoading,
      authError,
      registerWithEmailAndPassword,
      loginWithEmailAndPassword,
      logoutUser,
   };
};

export default useFirebase;
