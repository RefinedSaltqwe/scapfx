"use server";

import { db } from "@/server/db";
import { type PresetAndChildren } from "@/types/prisma";
import {
  type BeforeAfter,
  type Inclusions,
  type Gallery,
} from "@prisma/client";
import cuid from "cuid";

// Utility function to check if two objects are different (shallow comparison)
const hasChanges = (
  oldData: BeforeAfter | Inclusions | Gallery,
  newData: BeforeAfter | Inclusions | Gallery,
) => {
  return JSON.stringify(oldData) !== JSON.stringify(newData);
};

export const upsertPresetQuery = async (item: PresetAndChildren) => {
  // First, upsert the preset (create or update)
  const preset = await db.preset.upsert({
    where: item.id ? { id: item.id } : { id: cuid() }, // Ensure `where` always has a valid value
    update: {
      name: item.name,
      productId: item.productId,
      heroImg: item.heroImg,
      description: item.description,
      price: item.price,
      prevPrice: item.prevPrice,
      color: item.color,
    },
    create: {
      name: item.name,
      productId: item.productId,
      heroImg: item.heroImg,
      description: item.description,
      price: item.price,
      prevPrice: item.prevPrice,
      color: item.color,
      id: undefined,
    },
    include: {
      beforeAfterImages: true,
      inclusions: true,
      gallery: true,
    },
  });

  // Handle related beforeAfterImages
  if (item.beforeAfterImages?.length) {
    // Get current beforeAfterImages from the database
    const existingBeforeAfterImages = await db.beforeAfter.findMany({
      where: { presetId: preset.id },
    });

    // Track images that need to be deleted
    const imagesToDelete = existingBeforeAfterImages.filter(
      (existingImage) =>
        !item.beforeAfterImages.some((image) => image.id === existingImage.id),
    );

    // Delete any images that were removed
    if (imagesToDelete.length) {
      await db.beforeAfter.deleteMany({
        where: {
          id: { in: imagesToDelete.map((image) => image.id) },
        },
      });
    }

    // Handle new and updated beforeAfterImages
    await Promise.all(
      item.beforeAfterImages.map(async (image) => {
        if (image.id !== "") {
          // If beforeAfterImage has an id, check if it exists in the database
          const existingImage = await db.beforeAfter.findUnique({
            where: { id: image.id },
          });

          if (!existingImage || hasChanges(existingImage, image)) {
            await db.beforeAfter.upsert({
              where: { id: image.id },
              update: image, // Update if changed
              create: { ...image, presetId: preset.id }, // Create if new
            });
          }
        } else {
          // If no id (new image), create the image
          await db.beforeAfter.create({
            data: { ...image, presetId: preset.id, id: undefined },
          });
        }
      }),
    );
  }

  // Handle related inclusions
  if (item.inclusions?.length) {
    await Promise.all(
      item.inclusions.map(async (inclusion) => {
        if (inclusion.id !== "") {
          const existingInclusion = await db.inclusions.findUnique({
            where: { id: inclusion.id },
          });

          if (!existingInclusion || hasChanges(existingInclusion, inclusion)) {
            await db.inclusions.upsert({
              where: { id: inclusion.id },
              update: inclusion, // Update if changed
              create: { ...inclusion, presetId: preset.id }, // Create if new
            });
          }
        } else {
          await db.inclusions.create({
            data: { ...inclusion, presetId: preset.id, id: undefined },
          });
        }
      }),
    );
  }

  // Handle related gallery items (including removal of deleted images)
  if (item.gallery?.length) {
    // Get the current gallery images from the database
    const existingGalleryItems = await db.gallery.findMany({
      where: { presetId: preset.id },
    });

    // Track images that need to be deleted
    const imagesToDelete = existingGalleryItems.filter(
      (existingImage) =>
        !item.gallery.some(
          (galleryItem) => galleryItem.id === existingImage.id,
        ),
    );

    // Delete any images that were removed
    if (imagesToDelete.length) {
      await db.gallery.deleteMany({
        where: {
          id: { in: imagesToDelete.map((image) => image.id) },
        },
      });
    }

    // Handle new and updated gallery images
    await Promise.all(
      item.gallery.map(async (galleryItem) => {
        if (galleryItem.id !== "") {
          // If galleryItem has an id, check if it exists in the database
          const existingGalleryItem = await db.gallery.findUnique({
            where: { id: galleryItem.id },
          });

          if (
            !existingGalleryItem ||
            hasChanges(existingGalleryItem, galleryItem)
          ) {
            await db.gallery.upsert({
              where: { id: galleryItem.id },
              update: galleryItem, // Update if changed
              create: { ...galleryItem, presetId: preset.id }, // Create if new
            });
          }
        } else {
          // If no id (new image), create the image
          await db.gallery.create({
            data: { ...galleryItem, presetId: preset.id, id: undefined },
          });
        }
      }),
    );
  }

  return preset;
};
