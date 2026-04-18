"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/lib/cocart.d";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./cart-provider";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateItem, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
        {item.featured_image ? (
          <Image src={item.featured_image} alt={item.name} fill className="object-cover" sizes="80px" />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{item.name}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateItem(item.item_key, item.quantity.value - 1)}
            disabled={item.quantity.value <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm w-6 text-center">{item.quantity.value}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateItem(item.item_key, item.quantity.value + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold">{formatPrice(item.line_total)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => removeItem(item.item_key)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
