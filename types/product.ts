export interface Category {
  id: string;
  name: string;
  description?: string | null;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  size?: string;
  priceBuy?: number;
  priceRent?: number;
  stock?: number;
}

export interface ProductSize {
  id?: string;
  size: string;
  price?: number;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  basePriceBuy?: number;
  basePriceRent?: number;
  price?: number;
  categoryId?: string;
  category?: Category;
  images?: (string | ProductImage)[];
  variants?: ProductVariant[];
  sizes?: ProductSize[];
  isFeatured?: boolean;
  type?: 'beli' | 'sewa' | 'custom' | 'portfolio';
  createdAt?: string;
}

export interface ProductFilterParams {
  categoryId?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}
