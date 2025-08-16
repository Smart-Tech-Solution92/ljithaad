
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<null | { id: string; name: string }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data (replace with your auth logic, e.g., NextAuth, Firebase)
    setTimeout(() => {
      // Example: setUser({ id: '1', name: 'John Doe' });
      setLoading(false);
    }, 1000);
  }, []);

  return { user, loading };
};