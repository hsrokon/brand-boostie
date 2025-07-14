import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    // console.log(user);

    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return ()=> unSubscribe();
    },[])

    const createNewUser = (email, password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // const emailVerification = () => {
    //     return sendEmailVerification(auth.currentUser);
    // }

    const updateUserProfile = (displayName, photoURL)=> {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL
        })
    }

    const loginUser = (email, password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        return signOut(auth);
    }

    const userInfo = {
        user,
        loading,
        setUser,
        createNewUser,
        //emailVerification,
        updateUserProfile,
        loginUser,
        logInWithGoogle,
        logOutUser,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;