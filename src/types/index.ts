export type Preset = {
  productId: string;
  name: string;
  heroImg: string;
  description: string;
  price: number;
  prevPrice: number;
  color: string;
  beforeAfterImages: { beforeImage: string; afterImage: string }[];
  whatsIncluded: {
    name: string;
    description: string;
  }[];
  gallery: string[];
};

export interface CartItemsStripe {
  productId: string;
}
