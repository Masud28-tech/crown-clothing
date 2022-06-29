import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <Link to={title}><span className='title'> {title.toUpperCase()} </span></Link>

            <div className='preview'>
                {
                    products
                        .filter((product, idx) => idx < 4)
                        .map((product) => <ProductCard key={product.title} product={product} />)
                }
            </div>
        </div>
    );

}

export default CategoryPreview;