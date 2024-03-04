import React from 'react';
import { getAuth, signOut } from "firebase/auth";

const LogoutButton = () => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('User signed out successfully');
      // Optionally, redirect the user to the login page or update the state
    }).catch((error) => {
      // An error happened.
      console.log('Error signing out: ', error);
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
