export type Preset = {
  productId: string;
  name: string;
  heroImg: string;
  description: string;
  price: string;
  prevPrice: string;
  selected: boolean;
  beforeAfterImages: { beforeImage: string; afterImage: string }[];
  whatsIncluded: {
    name: string;
    description: string;
  }[];
  gallery: string[];
};
