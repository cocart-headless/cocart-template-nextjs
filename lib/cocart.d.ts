export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  featured: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  images: ProductImage[];
  categories: ProductCategory[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: ProductImage | null;
}

export interface CartItemMeta {
  key: string;
  label: string;
  value: string;
}

export interface CartItem {
  item_key: string;
  product_id: number;
  name: string;
  quantity: { value: number };
  price: string;
  line_total: string;
  featured_image: string;
  meta: CartItemMeta[];
}

export interface CartTotals {
  subtotal: string;
  subtotal_tax: string;
  shipping_total: string;
  total: string;
  total_tax: string;
}

export interface Cart {
  items: CartItem[];
  item_count: number;
  totals: CartTotals;
  cart_key: string;
}
