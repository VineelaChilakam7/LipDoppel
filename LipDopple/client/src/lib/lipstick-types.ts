export interface Lipstick {
  _id: string; // from MongoDB
  name: string;
  brand: string;
  shade: string;
  colorHex?: string;
  finish?: string;
  price?: number;
  imageUrl?: string;
}

export interface DupeRelationship {
  originalId: string;
  dupeIds: string[];
}
