"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Default sorting", value: "" },
  { label: "Sort by popularity", value: "popularity" },
  { label: "Sort by average rating", value: "rating" },
  { label: "Sort by latest", value: "date" },
  { label: "Sort by price: low to high", value: "price_asc" },
  { label: "Sort by price: high to low", value: "price_desc" },
];

export function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("orderby") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const url = new URL(window.location.href);
    if (e.target.value) {
      url.searchParams.set("orderby", e.target.value);
    } else {
      url.searchParams.delete("orderby");
    }
    url.searchParams.delete("order");
    router.push(url.pathname + url.search);
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="text-sm border rounded-md px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
