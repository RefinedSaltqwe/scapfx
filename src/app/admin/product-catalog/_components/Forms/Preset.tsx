"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  defaultBeforeAfterImages,
  defaultGallery,
  defaultPreset,
} from "@/data/default";
import { usePresets } from "@/hooks/stores/usePresetsStore";
import { useAction } from "@/hooks/useSafeAction";
import { upsertPreset } from "@/server/actions/upsert-preset";
import { UpsertPresetSchema } from "@/server/actions/upsert-preset/schema";
import { Input, Textarea } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type BeforeAfter, type Gallery } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { siteConfig } from "config/site";
import cuid from "cuid";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import React, {
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { ColorPicker } from "../ColorPicker";
import ComparisonInputs from "../ComparisonImages";
import GalleryInput from "../GalleryImages";
import FloatingFormSubmitBtn from "../FloatingFormSubmitBtn";
import Heading from "@/app/admin/components/Heading";
import { isImageUrl } from "@/lib/utils";

const Loader = lazy(() => import("@/components/Loader"));

type PresetFormProps = {
  productId?: string;
  type: string;
};

const PresetForm: React.FC<PresetFormProps> = ({ productId, type }) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const allPresets = usePresets((state) => state.presets);
  const updatePreset = usePresets((state) => state.updatePreset);
  const addPreset = usePresets((state) => state.addPreset);
  const prevPresetRef = useRef(false);
  const newCuid = cuid();

  const currentPreset = useMemo(
    () => allPresets?.find((preset) => preset.id === productId),
    [allPresets, productId],
  );

  const [hero, setHero] = useState(
    currentPreset?.heroImg ?? siteConfig.defaultProductImage,
  );

  const [comparisonImages, setComparisonImages] = useState<BeforeAfter[]>(
    currentPreset?.beforeAfterImages ?? [defaultBeforeAfterImages],
  );
  const [galleryImages, setGalleryImages] = useState<Gallery[]>(
    currentPreset?.gallery ?? [defaultGallery],
  );

  const form = useForm<z.infer<typeof UpsertPresetSchema>>({
    resolver: zodResolver(UpsertPresetSchema),
    defaultValues: currentPreset ?? defaultPreset,
  });

  const { execute: executeUpsertPreset, isLoading } = useAction(upsertPreset, {
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: ["all_presets"],
      });
      if (type === "update") {
        updatePreset(data);
        toast.success("Updated Successfully", {
          position: "top-right",
        });
      }
      if (type === "create") {
        addPreset(data);
        toast.success("Created Successfully", {
          position: "top-right",
        });
        router.push("/admin/product-catalog");
      }
    },
    onError: (error) => {
      toast.error(error, {
        position: "top-right",
      });
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof UpsertPresetSchema>) => {
      try {
        console.log("Form values before submission:", {
          ...values,
          beforeAfterImages: comparisonImages,
          gallery: galleryImages,
        });

        await executeUpsertPreset({
          ...values,
          beforeAfterImages: comparisonImages,
          gallery: galleryImages,
        });
        console.log("Preset updated successfully.");
      } catch (error) {
        console.error("Error during form submission:", error);
        if (error instanceof Error) {
          // You can also use error.message for more specific error info
          alert(`An error occurred: ${error.message}`);
        } else {
          alert("An unknown error occurred during submission.");
        }
      }
    },
    [comparisonImages, executeUpsertPreset, galleryImages],
  );

  useEffect(() => {
    if (currentPreset && !prevPresetRef.current) {
      setComparisonImages(currentPreset.beforeAfterImages);
      setGalleryImages(currentPreset.gallery);
      form.reset(currentPreset); // Reset form when currentPreset changes
      prevPresetRef.current = true; // Mark the effect as having run
    }
  }, [currentPreset, form]);

  if (!session) {
    router.push("/login");
  }
  if (status === "loading") {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
      </div>
    );
  }
  return (
    <>
      <Heading
        title={currentPreset?.name ?? "Create Preset"}
        subTitle="Create or Update preset"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="divide-y divide-white/5">
            <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-foreground text-base/7 font-semibold">
                  Preset Information
                </h2>
                <p className="text-muted-foreground mt-1 text-sm/6">
                  Use this form to provide details and suggestions for your
                  preset, which will be displayed on our website. Share any key
                  features or descriptions to help customers understand its
                  unique value.
                </p>
              </div>

              <div className="col-span-full md:col-span-2">
                <div className="grid grid-cols-1 gap-y-8 sm:max-w-xl sm:grid-cols-6 sm:gap-x-4">
                  <div className="col-span-full flex flex-col items-center gap-x-8">
                    {/* Display Hero Image */}
                    <Image
                      alt=""
                      src={hero} // Use the hero state here
                      className="mb-6 h-52 w-full flex-none rounded-lg bg-gray-800 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      width={24}
                      height={24}
                    />

                    {/* Form to update Hero Image */}
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="heroImg"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-primary data-[error=true]:text-destructive">
                              Hero Image
                            </FormLabel>
                            <FormControl>
                              <Input
                                onFocus={(e) => e.target.select()}
                                placeholder="Image Link"
                                {...field}
                                className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                                onBlur={(e) => {
                                  field.onChange(e); // Ensure react-hook-form is updating correctly
                                  if (isImageUrl(e.target.value)) {
                                    setHero(e.target.value); // Set the hero image if valid URL
                                  } else {
                                    toast.error("Invalid image url");
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-primary data-[error=true]:text-destructive">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Preset Name"
                              {...field}
                              className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <FormField
                      control={form.control}
                      name="productId"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-primary data-[error=true]:text-destructive">
                            Stripe Price Id
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Stripe Price Id"
                              onFocus={(e) => e.target.select()}
                              {...field}
                              className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-primary data-[error=true]:text-destructive">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Preset Name"
                              {...field}
                              className="bg-background text-primary focus:outline-primary block h-48 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full">
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-primary data-[error=true]:text-destructive">
                            Color
                          </FormLabel>
                          <FormControl>
                            <ColorPicker
                              value={field.value || "#000000"} // Default value or field value
                              onChange={(value) => field.onChange(value)} // Update form value on color change
                              onBlur={field.onBlur} // Handle blur to trigger form validation
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="prevPrice"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-primary data-[error=true]:text-destructive">
                            Previous Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              onFocus={(e) => e.target.select()}
                              placeholder="Previous Price"
                              step="0.01"
                              {...field}
                              onChange={(event) =>
                                field.onChange(+event.target.value)
                              }
                              className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* SLIDER */}
            <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-foreground text-base/7 font-semibold">
                  Comparison Slider
                </h2>
                <p className="text-muted-foreground mt-1 text-sm/6">
                  Use this slider to showcase a before-and-after comparison of
                  your preset in action. It allows customers to see the
                  transformation with your preset applied.
                </p>
              </div>

              <div className="col-span-2 grid grid-cols-1 gap-y-8 sm:max-w-xl">
                {comparisonImages.map((item, index) => {
                  return (
                    <div key={index}>
                      <ComparisonInputs
                        data={item}
                        index={index}
                        count={comparisonImages.length}
                        setComparisonImages={setComparisonImages}
                      />
                      <Separator className="m-0 my-3 w-full bg-slate-200 p-0 dark:bg-slate-700" />
                    </div>
                  );
                })}
                <div className="flex w-full flex-row">
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="!border-primary !text-primary hover:no-underline"
                    onClick={() =>
                      setComparisonImages((prev) => [
                        ...prev,
                        {
                          id: newCuid,
                          presetId: currentPreset?.id ?? "",
                          beforeImage: "",
                          afterImage: "",
                        },
                      ])
                    }
                  >
                    <span className="sr-only">Add Item</span>
                    <Plus size={18} className="mr-1 ml-[-4px]" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
            {/* GALLERY */}
            <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-foreground text-base/7 font-semibold">
                  Gallery
                </h2>
                <p className="text-muted-foreground mt-1 text-sm/6">
                  {`Display a collection of images showcasing the impact of your
                  preset. This gallery helps customers visualize the preset's
                  effect across different styles and settings.`}
                </p>
              </div>

              <div className="col-span-2 grid grid-cols-1 gap-y-8 sm:max-w-xl">
                {galleryImages.map((item, index) => {
                  return (
                    <div key={index}>
                      <GalleryInput
                        data={item}
                        index={index}
                        count={galleryImages.length}
                        setGalleryImages={setGalleryImages}
                      />
                      <Separator className="m-0 my-3 w-full bg-slate-200 p-0 dark:bg-slate-700" />
                    </div>
                  );
                })}
                <div className="flex w-full flex-row">
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="!border-primary !text-primary hover:no-underline"
                    onClick={() =>
                      setGalleryImages((prev) => [
                        ...prev,
                        {
                          id: newCuid,
                          link: "",
                          presetId: currentPreset?.id ?? "",
                        },
                      ])
                    }
                  >
                    <span className="sr-only">Add Item</span>
                    <Plus size={18} className="mr-1 ml-[-4px]" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>

            <FloatingFormSubmitBtn isLoading={isLoading} type={type} />
          </div>
        </form>
      </Form>
    </>
  );
};

export default PresetForm;
