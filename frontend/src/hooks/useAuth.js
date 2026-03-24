import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut 
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmResult, setConfirmResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          phoneNumber: firebaseUser.phoneNumber,
          username: `Explorer_${firebaseUser.uid.slice(-4)}`,
          xp: 1540,
          level: 42
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setupRecaptcha = (containerId) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  };

  const sendOTP = async (phoneNumber, containerId) => {
    setLoading(true);
    try {
      setupRecaptcha(containerId);
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmResult(result);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      console.error("OTP Send Error:", error);
      return { success: false, error: error.message };
    }
  };

  const verifyOTP = async (otpCode) => {
    setLoading(true);
    try {
      if (!confirmResult) throw new Error("No confirmation result found.");
      const result = await confirmResult.confirm(otpCode);
      setLoading(false);
      return { success: true, user: result.user };
    } catch (error) {
      setLoading(false);
      console.error("OTP Verify Error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, sendOTP, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
