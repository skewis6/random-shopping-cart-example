export interface ProductType {
  price: number;
  id: number;
  name: string;
  imageUrl: string;
}

export interface CartProductType extends ProductType {
  quantity: number;
}
