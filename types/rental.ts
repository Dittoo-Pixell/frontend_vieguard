// Types aligned with backend Prisma Accessory model

export interface Accessory {
  id: string;
  name: string;
  description?: string | null;
  price: string; // Decimal from backend comes as string
  stock: number;
  imageUrl?: string | null;
  deletedAt?: string | null;
}

export interface RentalBookingDto {
  accessoryId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  notes?: string;
}
