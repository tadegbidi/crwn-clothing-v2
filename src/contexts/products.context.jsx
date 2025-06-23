import { useState, createContext } from "react";

import SHOP_DATA from '../shop-data.json';

// console.log(SHOP_DATA);

export const ProductsContext = createContext({
    data: [],
});

export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState(SHOP_DATA);

    const value = {products, setProducts};

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>

}