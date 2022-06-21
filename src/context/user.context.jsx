import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

export const UserContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null
    }
);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const values = { currentUser, setCurrentUser }


    // To centralize the setCurrentUser state (context-storage) instead using seperatly in sign-in/sign-up pages again and again
    // Here 'onAuthState' i.e eventStream listener track the state and update it asynchronously.
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};