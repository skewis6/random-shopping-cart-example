import React, { useEffect, useState } from 'react';
import { Grid, Box, Drawer, TextField, Typography } from '@mui/material';
import { ShoppingBasketOutlined } from '@mui/icons-material';
import { CartProduct } from './components/CartProduct'
import { Product } from './components/Product';
import { useCookies } from 'react-cookie';

import { ProductType, CartProductType } from './types';
import './App.css';


function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cloneProucts, setCloneProducts] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [cart, setCart] = useState<CartProductType[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(['cart']);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/citayesh/product-api/SHOP_DATA')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.hats.items);
        setCloneProducts(data.hats.items);
      });

      const cartCookie = cookies.cart;
      if (cartCookie) {
        setCart(cartCookie);
      }
  }, []);

  useEffect(() => {
    const listProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    setProducts(listProducts);

    if (search === '') {
      setProducts(cloneProucts);
    }
  }, [search]);

  useEffect(() => {
    setCookie('cart', cart, { path: '/' });
  }, [cart]);

  const handleAddToCart = (product: ProductType) => {
    const itemExists = cart.find((item) => item.id === product.id)
    const newCart = itemExists ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, { ...product, quantity: 1 }]

    setCart(newCart)
  };

  const handleCart = () => {
    setShowCart(!showCart);
  };

  const handleRemoveFromCart = (id: number) => {
    const newCart = cart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0)

    setCart(newCart)
  };


  return (
    <div className="App">
      <TextField id="outlined-basic" label="Type to search" variant="outlined" onChange={(e) => setSearch(e.target.value)} />
      <Box className="cart" onClick={handleCart}> 
        <ShoppingBasketOutlined />
        {cart.length > 0 && <span className='number'>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
        <Drawer open={showCart} anchor='right' sx={{ width: 300 }} onClose={() => setShowCart(false)}>
          <Box sx={{ padding: 5 }}>
          {cart.length ? cookies.cart.map((item) => (
            <CartProduct key={item.id} {...item} handleRemoveFromCart={handleRemoveFromCart} />
          )) : <p>Cart is empty</p>}
          </Box>
        </Drawer>
      </Box>
      <Typography variant='h4' sx={{ textAlign: 'left', paddingLeft: '45px' }}>Products</Typography>
      <Grid container spacing={{xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12 }} className='products'>
        {products.map((product) => (
          <Product key={product.id} product={product} cart={cart} setCart={handleAddToCart} />
        ))}
      </Grid>
    </div>
  );
}

export default App;
