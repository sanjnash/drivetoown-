export type CarType = 'sedan' | 'suv' | 'hatchback' | 'hybrid' | 'wagon' | 'van' | 'convertible' | 'luxury';
export type FuelType = 'petrol' | 'hybrid' | 'plugin-hybrid' | 'diesel' | 'electric';

export interface CarSpec {
  seats: number;
  fuelConsumption: string;   // e.g. "6.8L/100km"
  ancapRating: number;       // always 5
  mileagePerLitre?: string;
  transmission?: string;
}

export interface Car {
  id: string;                // slug e.g. "toyota-camry"
  name: string;
  weeklyPrice: number;       // e.g. 239
  type: CarType;
  fuelType: FuelType;
  spec: CarSpec;
  imageSrc: string;          // e.g. "/images/cars/camry.webp"
  imageAlt: string;
  shortDescription: string;
  longDescription: string;
  equipped: string[];
  isPopular?: boolean;
  isAvailable?: boolean;
  weeksToOwn?: number;
}
