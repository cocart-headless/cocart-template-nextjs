"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/cocart.d";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
        {active?.src?.large || active?.src?.full ? (
          <Image
            src={active.src.large || active.src.full}
            alt={active.alt || name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors",
                i === activeIndex ? "border-primary" : "border-transparent",
              )}
            >
              {(img.src?.thumbnail || img.src?.medium) && (
                <Image src={img.src.thumbnail || img.src.medium} alt={img.alt || name} fill className="object-cover" sizes="64px" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
