"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DISMISS_THRESHOLD = 100;

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragging = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  function onTouchStart(e: React.TouchEvent) {
    const sheet = sheetRef.current;
    if (!sheet || sheet.scrollTop > 0) return;
    startY.current = e.touches[0]!.clientY;
    dragging.current = true;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!dragging.current) return;
    const dy = e.touches[0]!.clientY - startY.current;
    if (dy > 0) setDragOffset(dy);
  }

  function onTouchEnd() {
    if (!dragging.current) return;
    dragging.current = false;
    if (dragOffset > DISMISS_THRESHOLD) {
      onClose();
    }
    setDragOffset(0);
  }

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Venue floor plan"
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-[#F4EFE8] px-4 pb-8 pt-3 animate-slide-up"
        style={dragOffset > 0 ? { transform: `translateY(${dragOffset}px)`, transition: "none" } : undefined}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#CFC4B4]" />
        {children}
      </div>
    </div>,
    document.body,
  );
}
