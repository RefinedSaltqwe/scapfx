export type Preset = {
  id: string;
  productId: string;
  name: string;
  heroImg: string;
  description: string;
  price: number;
  prevPrice: number;
  color: string;
  beforeAfterImages: BeforeAfterImages[];
  inclusions: Inclusion[];
  gallery: Gallery[];
};

export type BeforeAfterImages = {
  id: string;
  beforeImage: string;
  presetId: string;
  afterImage: string;
};

export type Inclusion = {
  id: string;
  presetId: string;
  name: string;
  description: string;
};

export type Gallery = {
  id: string;
  link: string;
  presetId: string;
};

export interface CartItemsStripe {
  productId: string;
}
