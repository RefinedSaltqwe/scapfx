"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDeleteManyModal } from "@/hooks/stores/useDeleteManyModal";
import { usePresets } from "@/hooks/stores/usePresets";
import { Input } from "@headlessui/react";
import React, { lazy, useEffect, useState } from "react";

const Loader = lazy(() => import("@/components/Loader"));

const DeleteInvoicePrompt: React.FC = () => {
  const modalIds = useDeleteManyModal((state) => state.modalIds);
  const isOpen = useDeleteManyModal((state) => state.isOpen);
  const proceed = useDeleteManyModal((state) => state.proceed);
  const onClose = useDeleteManyModal((state) => state.onClose);
  const onIsProceed = useDeleteManyModal((state) => state.onIsProceed);
  const modalType = useDeleteManyModal((state) => state.type);
  const presets = usePresets((state) => state.presets);
  const [notConfirm, setNotConfirm] = useState<boolean>(true);

  useEffect(() => {
    if (!proceed) {
      setNotConfirm(true);
    }
  }, [proceed]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setNotConfirm(true);
      }}
    >
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle>{`You are about to delete ${
            modalIds?.length && modalIds?.length > 1
              ? `${modalIds?.length} ${modalType}s`
              : `${modalIds?.length} ${modalType}`
          }. Are sure you want to proceed?`}</DialogTitle>
          <DialogDescription>
            {`This action cannot be undone. This will permanently delete all the data from our servers.`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-row flex-wrap gap-2">
          {modalIds?.map((item) => {
            let finalName = item;
            if (modalType === "preset") {
              const name = presets.filter((i) => i.id === item);
              finalName = name ? name[0]!.name : item;
            }
            return (
              <Badge key={item} variant={"outline"}>
                {finalName}
              </Badge>
            );
          })}
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label
            htmlFor="confirm"
            className="text-foreground block text-sm leading-6 font-medium"
          >
            {`Type "DELETE" to proceed`}
          </Label>
          <Input
            type="text"
            id="confirm"
            onChange={(e) => {
              if (e.target.value === "DELETE") {
                setNotConfirm(false);
              } else {
                setNotConfirm(true);
              }
            }}
            autoComplete="postal-code"
            className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="DELETE"
          />
        </div>

        <DialogFooter className="flex w-full flex-col justify-end gap-3 md:flex-row">
          <DialogClose asChild>
            <Button type="button" className="w-full" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="w-full"
            variant={"destructive"}
            onClick={() => {
              onIsProceed(true);
            }}
            disabled={proceed ? proceed : notConfirm}
          >
            {proceed ? (
              <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteInvoicePrompt;
