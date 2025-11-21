"use client";
import { createContext, useEffect, useState, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.init";
import { toast } from "react-toastify";

export const allContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simple signup without email verification
  const signup = async (email, password, name) => {
    setLoading(true);
    setError('');
    try {
      // Create user
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name
      await updateProfile(result.user, {
        displayName: name
      });

      setLoading(false);
      toast.success('Account created successfully')
      return {
        success: true,
        user: result.user,
        message: 'Account created successfully!'
      };

    } catch (err) {
      setLoading(false);
      toast.error('Failed to created a account')
      let errorMessage = 'Signup failed. Please try again.';

      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Simple login without verification check
  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success('Login successfull')
      return { success: true, user: result.user };

    } catch (err) {
      setLoading(false);
      toast.error('Login failed')
      let errorMessage = 'Login failed. Please try again.';

      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setLoading(false);
      toast.success('Login successfull')
      return { success: true, user: result.user };
    } catch (err) {
      setLoading(false);
      const errorMessage = 'Google login failed. Please try again.';
      setError(errorMessage);
      toast.error('Login with google failed')
      return { success: false, error: errorMessage };
    }
  };

  const githubLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setLoading(false);
      return { success: true, user: result.user };
    } catch (err) {
      setLoading(false);
      const errorMessage = 'GitHub login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateProfileFn = async (name, image) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Profile update failed.' };
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
      toast.success('Successfully logout')
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: 'Logout failed.' };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      signup,
      login,
      googleLogin,
      githubLogin,
      updateProfileFn,
      logOut,
    }),
    [user, loading, error]
  );

  return (
    <allContext.Provider value={value}>
      {children}
    </allContext.Provider>
  );
};

export default Authprovider;