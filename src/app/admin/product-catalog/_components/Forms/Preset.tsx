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
import {
  defaultBeforeAfterImages,
  defaultGallery,
  defaultPreset,
} from "@/data/default";
import { usePresets } from "@/hooks/stores/usePresets";
import { UpsertPresetSchema } from "@/server/actions/upsert-preset/schema";
import { Input, Textarea } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Gallery, type BeforeAfter } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, {
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { ColorPicker } from "../ColorPicker";
import ComparisonInputs from "../ComparisonImages";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import cuid from "cuid";
import GalleryInput from "../GalleryImages";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/useSafeAction";
import { upsertPreset } from "@/server/actions/upsert-preset";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Loader = lazy(() => import("@/components/Loader"));

type PresetFormProps = {
  productId: string;
  type: string;
};

const PresetForm: React.FC<PresetFormProps> = ({ productId, type }) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const allPresets = usePresets((state) => state.presets);
  const updatePreset = usePresets((state) => state.updatePreset);
  const prevPresetRef = useRef(false);
  const newCuid = cuid();

  const currentPreset = useMemo(
    () => allPresets?.find((preset) => preset.id === productId),
    [allPresets, productId],
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
      if (type === "update") {
        updatePreset(data);
      }

      void queryClient.invalidateQueries({
        queryKey: ["all_presets"],
      });
      toast.success("Updated Successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof UpsertPresetSchema>) => {
      console.log({
        ...values,
        beforeAfterImages: comparisonImages,
        gallery: galleryImages,
      });
      void executeUpsertPreset({
        ...values,
        beforeAfterImages: comparisonImages,
        gallery: galleryImages,
      });
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
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <div className="col-span-full md:col-span-2">
              <div className="grid grid-cols-1 gap-y-8 sm:max-w-xl sm:grid-cols-6 sm:gap-x-4">
                <div className="col-span-full flex items-center gap-x-8">
                  <Image
                    alt=""
                    src={
                      currentPreset?.heroImg ?? "https://github.com/shadcn.png"
                    }
                    className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={24}
                    height={24}
                  />
                  <div>
                    <button
                      type="button"
                      className="text-foreground rounded-md bg-white/10 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white/20"
                    >
                      Change Hero Image
                    </button>
                    <p className="text-muted-foreground mt-2 text-xs/5">
                      JPG, GIF or PNG. 1MB max.
                    </p>
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
                            onFocus={(e) => e.target.select()}
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
                This for the before and after comprasion slider images.
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
                This for the gallery.
              </p>
            </div>

            <div className="col-span-2 grid grid-cols-1 gap-y-8 sm:max-w-xl">
              {galleryImages.map((item, index) => {
                return (
                  <div key={index}>
                    <GalleryInput
                      data={item}
                      index={index}
                      count={comparisonImages.length}
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

          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-foreground text-base/7 font-semibold">
                Log out other sessions
              </h2>
              <p className="text-muted-foreground mt-1 text-sm/6">
                Please enter your password to confirm you would like to log out
                of your other sessions across all of your devices.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <Button
                  className="bg-primary hover:bg-primary focus-visible:outline-primary flex h-12 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white uppercase shadow-sm focus-visible:outline focus-visible:outline-offset-2"
                  type="submit"
                >
                  {isLoading ? (
                    <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PresetForm;
