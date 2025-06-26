import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';


const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems && cartItems.map(item => <CartItem cartItem={item} key={item.id} />)
                }
            </div>

            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;