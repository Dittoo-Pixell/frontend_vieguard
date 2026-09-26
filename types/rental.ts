export interface Accessory {
  id: string;
  name: string;
  code?: string;
  description: string;
  rentalPrice: number;
  depositPrice: number;
  stock: number;
  availableStock?: number;
  images: string[];
  category?: string;
  condition?: string;
}

export interface RentalBookingDto {
  accessoryId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  notes?: string;
}
