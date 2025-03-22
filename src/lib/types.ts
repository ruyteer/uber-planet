export enum PlanetType {
  EARTH = "earth",
  MARS = "mars",
}

export interface Address {
  id: string;
  planetType: PlanetType;
  addressType: "shipping" | "billing";
  label: string;
  name: string;
  phone: string;

  addressLine?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;

  marsLot?: string;
}
