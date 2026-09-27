// Types aligned with backend Prisma schema

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  _count?: {
    products: number;
  };
}

export interface ProductImage {
  id: string;
  productId?: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId?: string;
  size: string;
  stockBuy: number;
  stockRent: number;
  priceBuyOverride?: string | null;
  priceRentOverride?: string | null;
  deletedAt?: string | null;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description?: string | null;
  basePriceBuy?: string | null;
  basePriceRent?: string | null;
  isCustomAvailable: boolean;
  isVisible: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface ProductFilterParams {
  categoryId?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}
