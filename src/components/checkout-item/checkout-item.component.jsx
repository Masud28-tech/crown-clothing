import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, price, quantity } = cartItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const addItemHnadler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <div className='name'> {name} </div>

            <div className='quantity'>
                <div className='arrow' onClick={removeItemHandler} > &#10094; </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHnadler}> &#10095; </div>
            </div>

            <div className='price'> {price}</div>


            <div className='remove-button' onClick={clearItemHandler}> &#10006;</div>

        </div>
    );
}

export default CheckoutItem;