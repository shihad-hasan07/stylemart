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
import useAxios from "@/hooks/useAxios";

export const allContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Authprovider = ({ children }) => {
  const axiosPublic = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // store info
  const [storeInfo, setStoreInfo] = useState(null);
  const [storeLoading, setStoreLoading] = useState(true);

  const loadStoreInfo = async () => {
    try {
      setStoreLoading(true);
      const res = await axiosPublic.get('/settings/store');
      const data = res.data?.data || res.data;
      setStoreInfo(data);
    } catch (err) {
      console.error('Failed to load store info', err);
    } finally {
      setStoreLoading(false);
    }
  };

  useEffect(() => {
    loadStoreInfo();
  }, []);


  // get the use from db 
  const [userfromDB, setUserfromDB] = useState(null);
  const [latestUpdate, setLatestUpdate] = useState(0);
  const [dbUserLoading, setDbUserLoading] = useState(false)

  useEffect(() => {
    if (!user?.email) return;

    setDbUserLoading(true);

    axiosPublic
      .get(`/users/single?gmail=${user.email}`)
      .then(res => {
        setUserfromDB(res.data.data);
      })
      .catch(console.error)
      .finally(() => {
        setDbUserLoading(false);
      });
  }, [user?.email, latestUpdate]);



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
      setLatestUpdate(prev => prev + 1)
      setLoading(false);

      return {
        success: true,
        user: result.user,
        message: 'Account created successfully!'
      };

    } catch (err) {
      setLoading(false);
      toast.error('Failed to create account')
      let errorMessage = 'Signup failed. Please try again.';

      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'User already registered.';
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
      const firebaseUser = result.user;

      // USER DATA FOR DB
      const userData = {
        name: firebaseUser.displayName || "",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "",
        role: "user",
        phone: "",
        address: {},
      };
      try {
        axiosPublic.post('/users/create-user', userData);
        setLatestUpdate(prev => prev + 1)
      } catch {

      }

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
      const firebaseUser = result.user;

      // USER DATA FOR DB
      const userData = {
        name: firebaseUser.displayName || "",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "",
        role: "user",
        phone: "",
        address: {},
      };
      try {
        await axiosPublic.post('/users/create-user', userData);
        setLatestUpdate(prev => prev + 1)
        toast.success('Login successfull')
      } catch (err) {
        await result.user.delete();
        toast.error('Login failed')
      }
      setLoading(false);
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
      const updateData = {};

      if (name) updateData.displayName = name;
      if (image) updateData.photoURL = image;

      await updateProfile(auth.currentUser, updateData);

      await auth.currentUser.reload();

      setUser({ ...auth.currentUser });
      return { success: true };

    } catch (err) {
      return { success: false, error: "Profile update failed." };
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

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      userfromDB, setUserfromDB, setLatestUpdate, dbUserLoading,
      user,
      loading,
      error,
      signup,
      login,
      googleLogin,
      githubLogin,
      updateProfileFn,
      logOut,

      storeInfo,
      storeLoading,
      reloadStoreInfo: loadStoreInfo,
    }),
    [user, loading, error, userfromDB,storeInfo,storeLoading]
  );

  return (
    <allContext.Provider value={value}>
      {children}
    </allContext.Provider>
  );
};

export default Authprovider;