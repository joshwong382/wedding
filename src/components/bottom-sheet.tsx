"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DISMISS_THRESHOLD = 100;

const CLOSE_DURATION = 250;

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragging = useRef(false);
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);

  const animateClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setVisible(false);
      onClose();
    }, CLOSE_DURATION);
  }, [closing, onClose]);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
    } else if (visible && !closing) {
      animateClose();
    }
  }, [open, visible, closing, animateClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") animateClose();
    },
    [animateClose],
  );

  useEffect(() => {
    if (!visible) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [visible, handleKeyDown]);

  function startDrag(y: number) {
    const sheet = sheetRef.current;
    if (!sheet || sheet.scrollTop > 0) return;
    startY.current = y;
    dragging.current = true;
  }

  function moveDrag(y: number) {
    if (!dragging.current) return;
    const dy = y - startY.current;
    if (dy > 0) setDragOffset(dy);
  }

  function endDrag() {
    if (!dragging.current) return;
    dragging.current = false;
    if (dragOffset > DISMISS_THRESHOLD) {
      animateClose();
    }
    setDragOffset(0);
  }

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={animateClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Venue floor plan"
        className={`relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-[#F4EFE8] px-4 pb-8 pt-3 ${closing ? "animate-slide-down" : "animate-slide-up"}`}
        style={dragOffset > 0 ? { transform: `translateY(${dragOffset}px)`, transition: "none" } : undefined}
        onTouchStart={(e) => startDrag(e.touches[0]!.clientY)}
        onTouchMove={(e) => moveDrag(e.touches[0]!.clientY)}
        onTouchEnd={endDrag}
        onMouseDown={(e) => startDrag(e.clientY)}
        onMouseMove={(e) => moveDrag(e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#CFC4B4]" />
        {children}
      </div>
    </div>,
    document.body,
  );
}
