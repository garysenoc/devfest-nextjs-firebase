import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from './firebase';

export const currentUser = () => {
  return onAuthStateChanged(auth, (user) => {});
};

export const signInWithGoogle = (redirect: any): void => {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      redirect();

      alert('You have successfully signed in with Google');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage);
      // ...
    });
};

export const signInEmailPassword = (
  email: string,
  password: string,
  redirect: Function,
): void => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert('Succefully signed in');
      redirect();
      // ...
    })
    .catch((error) => {
      alert(error.message);
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
    });
};

export const signUpEmailPassword = (
  email: string,
  password: string,
  redirect: any,
): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      alert('You have successfully signed up');
      redirect();
    })
    .catch((error) => {
      //   const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
};

export const signInAnonymous = () => signInAnonymously(auth);

export const logOut = () => signOut(auth);

