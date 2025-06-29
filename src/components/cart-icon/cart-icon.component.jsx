
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCount, ShoppingBag } from './cart-icon.styles.jsx';

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const handleCartStatus = () => {
        setIsCartOpen(!isCartOpen);
    }

    
    return (
        <CartIconContainer onClick={handleCartStatus} >
            <ShoppingBag />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;