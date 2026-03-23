import { useState, useEffect } from 'react';

// Replace with your backend URL
const API_URL = 'http://localhost:5000/api';

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, refetch: fetchUser };
};
