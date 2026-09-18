// ============================================
// Aqua Pro — TypeScript Type Definitions
// ============================================

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  currency: string;
  currencyCode: string;
  social: {
    facebook: string;
    tiktok: string;
    instagram?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parentId?: string;
  order: number;
  subcategories?: Category[];
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type Availability = 'in-stock' | 'out-of-stock' | 'limited';
export type CareLevel = 'easy' | 'intermediate' | 'advanced';
export type Temperament = 'peaceful' | 'semi-aggressive' | 'aggressive';
export type TankZone = 'top' | 'middle' | 'bottom' | 'all';

export interface BaseProduct {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategoryId?: string;
  price: number;
  salePrice?: number;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  availability: Availability;
  brand?: string;
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EquipmentProduct extends BaseProduct {
  type: 'equipment';
  specifications: Record<string, string>;
  warranty?: string;
  includes?: string[];
  compatibility?: string;
  installationNotes?: string;
}

export interface LiveFishProduct extends BaseProduct {
  type: 'fish';
  commonName: string;
  scientificName: string;
  careLevel: CareLevel;
  temperament: Temperament;
  tankZone: TankZone;
  adultSize: string;
  minimumTankSize: string;
  waterTemperature: string;
  phRange: string;
  diet: string;
  compatibility: string;
  origin: string;
  recommendedGroupSize: string;
  waterType: 'freshwater' | 'marine' | 'brackish';
  careInstructions?: string;
}

export type Product = EquipmentProduct | LiveFishProduct;

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  deliveryMethod: 'delivery' | 'pickup';
  address?: string;
  city?: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: (CartItem & { product: Product })[];
  customer: OrderFormData;
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
