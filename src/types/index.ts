export type User = {
  id: string;
  name?: string;
  email: string;
  password: string;
  emailVerified?: Date;
  image?: string;
  forgotPasswordId?: string;
  accounts: Account[];
  sessions: Session[];
  posts: Post[];
  ownedPresets: PresetUser[];
};

export type CurrentUser = {
  user: User;
};

export type Post = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: string;
};

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  refresh_token_expires_in?: number;
  user?: Partial<User>;
};

export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user?: Partial<User>;
};

export type PresetUser = {
  id: string;
  userEmail: string;
  orderId?: string;
  presetId: string;
  createdAt: Date;
  stripeSessionId: string;
  user?: Partial<User>;
  preset: Preset;
};

export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};

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

export interface MetaApiError {
  message: string;
  type: string;
  code: number;
  fbtrace_id: string;
}

export interface MetaApiResponse {
  events_received?: number;
  error?: MetaApiError;
}

export interface MetaEventData {
  event_name: string;
  event_source_url: string;
  user_agent: string;
  value: number;
  content_ids: string[];
  content_name: string;
  content_type: string;
  email?: string;
  user_data?: { fbclid: string }; // Add optional user_data property
}
