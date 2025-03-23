import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAction } from "@/hooks/useSafeAction";
import { updatePriceId } from "@/server/actions/update-productId";
import { UpdatePriceIdSchema } from "@/server/actions/update-productId/schema";
import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import Loader from "../Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usePresets } from "@/hooks/stores/usePresetsStore";

export function QuickEditModal({
  data,
}: {
  data: {
    name: string;
    id: string;
    productId: string;
  };
}) {
  const [isOpen, setIsOpen] = useState(false); // Control modal state
  const queryClient = useQueryClient();
  const updatePreset = usePresets((state) => state.updatePreset);

  const { execute: executeUpdatePriceId, isLoading } = useAction(
    updatePriceId,
    {
      onSuccess: (data) => {
        void queryClient.invalidateQueries({ queryKey: ["all_presets"] });
        updatePreset(data);
        toast.success("Updated Successfully", { position: "top-right" });
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(error, { position: "top-right" });
      },
    },
  );

  const form = useForm<z.infer<typeof UpdatePriceIdSchema>>({
    resolver: zodResolver(UpdatePriceIdSchema),
    defaultValues: { id: data.id, productId: data.productId },
  });

  const onSubmit = async (values: z.infer<typeof UpdatePriceIdSchema>) => {
    void executeUpdatePriceId(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span
          className="min-w-[1000px] text-left font-medium capitalize hover:cursor-pointer hover:underline"
          onClick={() => setIsOpen(true)} // Open modal on click
        >
          {data.name}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{data.name}</DialogTitle>
          <DialogDescription>
            {`Update the Stripe Price ID below.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-primary data-[error=true]:text-destructive">
                    Stripe Price ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price ID"
                      {...field}
                      onFocus={(e) => e.target.select()}
                      className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
