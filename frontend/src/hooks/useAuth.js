import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut 
} from 'firebase/auth';
import { auth } from '../services/firebase';

// Update this to your public backend URL (e.g. from ngrok)
const API_URL = 'http://127.0.0.1:5000/api/auth';

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
    console.log("sendOTP called for:", phoneNumber);
    setLoading(true);
    try {
      // Try Backend Simulation First (to bypass Firebase region issues)
      console.log("Attempting backend simulation...");
      const response = await fetch(`${API_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });
      const data = await response.json();
      console.log("Backend response:", data);
      
      if (data.success) {
        console.log("Simulated OTP sent via Backend success!");
        setConfirmResult({ simulated: true, phoneNumber });
        setLoading(false);
        return { success: true };
      }

      // Fallback to Firebase
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

      if (confirmResult.simulated) {
        console.log("Verifying simulated OTP...");
        const response = await fetch(`${API_URL}/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: confirmResult.phoneNumber, otp: otpCode })
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          setLoading(false);
          return { success: true };
        } else {
          throw new Error(data.error || "Verification failed");
        }
      }

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
