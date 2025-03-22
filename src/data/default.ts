export const defaultBeforeAfterImages = {
  id: "",
  presetId: "",
  beforeImage: "",
  afterImage: "",
};
export const defaultGallery = {
  id: "",
  link: "",
  presetId: "",
};
export const defaultPreset = {
  id: "",
  productId: "",
  name: "",
  heroImg: "",
  description: "",
  price: 0,
  prevPrice: 0,
  color: "",
  beforeAfterImages: [defaultBeforeAfterImages],
  inclusions: [
    {
      id: "",
      presetId: "",
      name: "",
      description: "",
    },
  ],
  gallery: [defaultGallery],
};

export const defaultUser = {
  id: "empty",
  email: "empty",
  password: "empty",
  name: "empty",
  emailVerified: undefined,
  image: "empty",
  forgotPasswordId: "empty",
  accounts: [],
  sessions: [],
  posts: [],
  ownedPresets: [],
};
