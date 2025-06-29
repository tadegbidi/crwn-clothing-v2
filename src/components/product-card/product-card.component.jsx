
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ProductCardContainer, Footer } from './product-card.styles.jsx';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const {name, price, imageUrl} = product;

    const { addItemToCart } = useContext(CartContext);

    const handleAddItem = () => {
        addItemToCart(product);
    }

    return ( 
        <ProductCardContainer>

            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </Footer>

            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={handleAddItem}>Add to card</Button>
        </ProductCardContainer>
    );

}

export default ProductCard;