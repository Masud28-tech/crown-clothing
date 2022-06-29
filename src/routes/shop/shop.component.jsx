import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../../components/categories-preview/categories-preview.component";
import CategoryPage from "../category/categoryPage";

const Shop = () => {

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category" element={<CategoryPage/>} />
        </Routes>

    );
}

export default Shop;