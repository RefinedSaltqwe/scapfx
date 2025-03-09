import {
  type Preset,
  type PresetUser,
  type User,
  type BeforeAfter,
  type Gallery,
  type Inclusions,
} from "@prisma/client";

export type PresentUserWithPreset = PresetUser & {
  preset: Preset;
};

export type CurrentUserPrisma =
  | (User & {
      ownedPresets: PresentUserWithPreset[];
    })
  | null;

export type PresetAndChildren = Preset & {
  beforeAfterImages: BeforeAfter[];
  inclusions: Inclusions[];
  gallery: Gallery[];
};
