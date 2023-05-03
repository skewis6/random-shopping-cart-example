import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { currencyFormatter } from '../../utils/formatters'
import { ProductProps } from './types'

export const Product: React.FC<ProductProps> = ({ product, cart, setCart }) => {
  return (
    <Grid item xs={2} key={product.id} sx={{width: '100%', height: '370px'}}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <Typography variant='h6' fontWeight={700}>{product.name}</Typography>
      <Typography variant='h6' fontSize={16}>{currencyFormatter(product.price)}</Typography>
      <Button variant='contained' onClick={() => setCart(product)}>Add to cart</Button>
    </Grid>
  )
}
