import { useEffect } from 'react';
import { auth, db, signInWithGoogle } from './firebase';

const App = () => {
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      console.log(`user`, user);
      return user;
    });

    const getUsers = async () => {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();

      snapshot.forEach((doc) => {
        console.log('doc', doc.exists);
      });
    };

    getUsers();

    return () => unsub();
  }, [auth, db]);

  return (
    <div>
      <h1 className='text-3xl text-blue-800'>App</h1>
      <button type='button' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default App;
