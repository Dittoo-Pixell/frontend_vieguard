export type OrderType = 'beli' | 'sewa' | 'custom';
export type OrderStatus =
  | 'pending'
  | 'dikonfirmasi'
  | 'diproses'
  | 'siap_diambil'
  | 'selesai'
  | 'dibatalkan';

export interface OrderItem {
  id: string;
  orderId: string;
  itemType: 'product' | 'accessory';
  itemId: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  orderType: OrderType;
  status: OrderStatus;
  totalAmount: number;
  downPayment: number;
  remainingPayment: number;
  institutionName?: string;
  picName: string;
  picPhone: string;
  notes?: string;
  items: OrderItem[];
  history?: OrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  orderType: OrderType;
  institutionName?: string;
  picName: string;
  picPhone: string;
  notes?: string;
  items: {
    itemType: 'product' | 'accessory';
    itemId: string;
    size?: string;
    quantity: number;
    notes?: string;
  }[];
}
