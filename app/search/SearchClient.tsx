"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type SearchItem = {
  id: string;
  type: "News" | "Course" | "Department";
  title: string;
  description: string;
  href: string;
};

export function SearchClient({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQuery(query), 250);
    return () => window.clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const value = debouncedQuery.trim().toLowerCase();
    if (!value) return items;
    return items.filter((item) =>
      [item.title, item.description, item.type].join(" ").toLowerCase().includes(value)
    );
  }, [debouncedQuery, items]);

  return (
    <div>
      <label className="mb-8 flex items-center gap-3 border border-gray-200 px-4 py-3">
        <Search size={20} className="text-gray-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search news, courses, and departments"
          className="w-full outline-none"
        />
      </label>

      <div className="mb-5 text-sm font-semibold text-gray-500">{results.length} results</div>
      <div className="space-y-4">
        {results.map((item) => (
          <Link key={`${item.type}-${item.id}`} href={item.href} className="block border border-gray-200 p-5 transition hover:border-red-200 hover:bg-red-50">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-700">{item.type}</p>
            <h2 className="mt-2 text-xl font-extrabold text-[#1A1A2E]">{item.title}</h2>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

