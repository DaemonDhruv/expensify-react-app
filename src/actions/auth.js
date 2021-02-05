import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (userId) => ({
    type: 'LOGIN',
    userId
});

export const startLogin = () => (
    // We are providing the googleAuthProvider to signInWithPopup
    // This will open up a popup window and user's will be asked to 
    // sign in with their google account
    // Then we will look for the sign in state .. Whether the user is
    // logged in or logged out! // in App.js    
    () => (
        firebase.auth().signInWithPopup(googleAuthProvider)
    )
);

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => (
    () => (
        firebase.auth().signOut()
    )
);