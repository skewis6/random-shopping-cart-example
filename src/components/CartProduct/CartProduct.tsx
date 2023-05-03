import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { currencyFormatter } from '../../utils/formatters'
import { CartProductProps } from './types'

export const CartProduct: React.FC<CartProductProps> = ({ name, price, id, imageUrl, quantity, handleRemoveFromCart }) => {
  return (
    <Box sx={{ display: 'flex', height: '100px', width: '100%', marginBottom: '20px', overflow: 'hidden' }}>
      <img src={imageUrl} alt={name} />
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px' }}>
        <Typography variant='h6' fontSize={16}>{name}</Typography>
        <Typography variant='h6' fontSize={14}>{currencyFormatter(quantity * price)}</Typography>
        <Typography variant='h6' fontSize={14}>Quantity: {quantity}</Typography>
        <Link fontSize={12} onClick={() => handleRemoveFromCart(id)}>Remove</Link>
      </Box>
    </Box>
  )
}
