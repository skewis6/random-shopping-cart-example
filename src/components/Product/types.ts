import { ProductType, CartProductType } from '../../types';

export interface ProductProps {
  product: ProductType;
  cart: CartProductType[];
  setCart: (product: ProductType) => void;
}