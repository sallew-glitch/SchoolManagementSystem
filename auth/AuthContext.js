import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async authUser => {
      setLoading(true);
      if (authUser) {
        const userDoc = await firestore()
          .collection('users')
          .doc(authUser.uid)
          .get();

        setUser({
          uid: authUser.uid,
          email: authUser.email,
          role: userDoc.data().role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
