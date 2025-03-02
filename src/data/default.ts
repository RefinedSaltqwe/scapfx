export const defaultPreset = {
  id: "",
  productId: "",
  name: "",
  heroImg: "",
  description: "",
  price: 0,
  prevPrice: 0,
  color: "",
  beforeAfterImages: [
    { id: "", presetId: "", beforeImage: "", afterImage: "" },
  ],
  inclusions: [{ id: "", presetId: "", name: "", description: "" }],
  gallery: [{ id: "", presetId: "", link: "" }], // Ensure no undefined values here
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
