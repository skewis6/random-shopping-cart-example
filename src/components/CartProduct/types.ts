export interface CartProductProps {
  price: number;
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  handleRemoveFromCart: (id: number) => void;
}