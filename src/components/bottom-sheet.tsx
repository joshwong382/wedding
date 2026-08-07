"use client";

import { Drawer } from "vaul";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the sheet — also the visually hidden Drawer.Title. */
  title: string;
  /** Tailwind max-height. The chart sheet wants more room than the floor plan. */
  maxHeight?: string;
  children: React.ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  maxHeight = "max-h-[85vh]",
  children,
}: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Drawer.Content
          aria-label={title}
          className={`fixed inset-x-0 bottom-0 z-50 mx-auto flex ${maxHeight} w-full max-w-2xl flex-col rounded-t-2xl bg-[#F4EFE8] px-4 pb-8 pt-3 outline-none`}
        >
          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <div className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-[#CFC4B4]" />
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
