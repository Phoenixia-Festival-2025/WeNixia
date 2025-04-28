export interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: string;
}

export interface FoodTruck {
  id: number;
  name: string;
  description: string;
  status: string;
  menuItems: MenuItem[];
}