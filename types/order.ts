// Types aligned with backend Prisma schema & orders.validator.ts

export type OrderType = 'beli' | 'sewa' | 'custom';
export type OrderStatus =
  | 'pending'
  | 'dikonfirmasi'
  | 'diproses'
  | 'siap_diambil'
  | 'selesai'
  | 'dibatalkan';

export type ItemType = 'product' | 'accessory';

export interface OrderItemPayload {
  itemType: ItemType;
  productId?: number | string;
  productVariantId?: number | string;
  accessoryId?: number | string;
  quantity: number;
  size?: string;
  unitPrice: number;
}

export interface CreateOrderDto {
  orderType: OrderType;
  requiresProduction?: boolean;
  notes?: string;
  items: OrderItemPayload[];
  rentalDetail?: {
    pickupDate: string;
    returnDate: string;
  };
  customDetail?: {
    designReference?: string;
    designDescription?: string;
    jenisJenjang?: string;
    consultationNote?: string;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  itemType: ItemType;
  productId?: string;
  productVariantId?: string;
  accessoryId?: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  size?: string;
}

export interface OrderRental {
  id: string;
  orderId: string;
  pickupDate: string;
  returnDate: string;
  status: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  orderType: OrderType;
  requiresProduction: boolean;
  status: OrderStatus;
  totalPrice: string;
  dpAmount?: string;
  isLunas: boolean;
  deadlineDate?: string;
  expiredAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  rental?: OrderRental;
  customOrderDetail?: {
    id: string;
    designReference?: string;
    designDescription?: string;
    jenisJenjang?: string;
    consultationNote?: string;
  };
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string;
  changedBy?: string;
  createdAt: string;
}
