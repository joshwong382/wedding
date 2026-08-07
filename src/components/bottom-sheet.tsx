"use client";

import { Drawer } from "vaul";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Drawer.Content
          aria-label="Venue floor plan"
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[90svh] w-full max-w-2xl flex-col rounded-t-2xl bg-[#F4EFE8] px-4 pb-6 pt-3 outline-none"
        >
          <Drawer.Title className="sr-only">Venue floor plan</Drawer.Title>
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#CFC4B4]" />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
