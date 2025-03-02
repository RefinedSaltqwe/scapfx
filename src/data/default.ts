export const defaultPreset = {
  productId: "",
  name: "",
  heroImg: "",
  description: "",
  price: 0,
  prevPrice: 0,
  color: "",
  beforeAfterImages: [{ beforeImage: "", afterImage: "" }],
  whatsIncluded: [{ name: "", description: "" }],
  gallery: [{ link: "" }], // Ensure no undefined values here
};

export const defaultUser = {
  id: "",
  email: "",
  password: "",
  name: "",
  emailVerified: undefined,
  image: "",
  accounts: [],
  sessions: [],
  posts: [],
  ownedPresets: [],
};
