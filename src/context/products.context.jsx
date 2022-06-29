import { createContext, useEffect, useState } from "react";

import { addCollectionAndDocumentInFirebase, getCollectionAndDocumentFromFirebase } from "../utils/firebase/firebase.util.js";

// import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    //1] STORES 'categories' collection IN FIREBASE DATABASE ON RENDERING THATS WHY COMMENTED
    // useEffect(() => {
    //     addCollectionAndDocumentInFirebase("categories", SHOP_DATA);
    // }, []);


    //2] FETCHS 'categories' collection from firebase
    useEffect(() => {
        const getCollectionAndDocument = async () => {
            const categoryMap = await getCollectionAndDocumentFromFirebase();
            setCategoriesMap(categoryMap);
        }
        getCollectionAndDocument();
    }, [])

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};