export type Product = {
  product_id: string;
  name: string;
  short_description?: string;
  float_price: string;
  float_special: string | false;
  price: string;
  special?: string | false;
  currency?: string;
  images: Array<string>;
  description: string;
  rating: string;
  product_code?: string;
  brand?: string;
  availability?: string;
  image?: string;
  product_images: ProductImage[];
  product_options?: ProductOption[];
  related_product?: Array<Product>;
  share_links?: string;
  quantity: number;
  attributes?: ProductAttribute[];
  seller_id?: string;
  thumb?: string;
  tax_class_id?: string;
  stock_status?: string;
  reward?: number;
  reviews?: number;
};

export interface ProductAttribute {
  name?: string;
  text?: string;
}

export interface ProductOption {
  product_option_id: string;
  product_option_value: string;
  option_id: string;
  name: string;
  type: string;
  option_value: OptionValue[];
  required: string;
}

export interface OptionValue {
  product_option_value_id: string;
  option_value_id: string;
  name: string;
  image_thumb: string;
  image: string;
  price: string | boolean;
  float_price: string | boolean;
  currency: string;
  price_prefix: string;
}

export interface ProductImage {
  url: string;
}

export type CartItemOption = {
  valueName?: string;
  value: string;
};

export type CartItem = {
  key: number;
  product_id: string;
  name: string;
  model: string;
  option: CartItemOption[];
  quantity: number;
  stock: boolean;
  shipping: string;
  price: string;
  float_price: number;
  currency: string;
  total: string;
  float_total: number;
  reward: number;
  image: string;
};
