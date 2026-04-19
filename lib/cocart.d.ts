export interface ProductImageSrc {
  thumbnail: string;
  medium: string;
  large: string;
  full: string;
  [key: string]: string;
}

export interface ProductImage {
  id: number;
  src: ProductImageSrc;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductCurrency {
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface ProductPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  currency: ProductCurrency;
}

export interface ProductStock {
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  manage_stock: boolean;
}

export interface ProductAttribute {
  id: number;
  name: string;
  position: number;
  is_attribute_visible: boolean;
  used_for_variation: boolean;
  options: Record<string, string>;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable" | "grouped" | "external";
  sku: string;
  description: string;
  short_description: string;
  prices: ProductPrices;
  featured: boolean;
  stock: ProductStock;
  images: ProductImage[];
  categories: ProductCategory[];
  attributes: Record<string, ProductAttribute>;
  related: number[];
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
