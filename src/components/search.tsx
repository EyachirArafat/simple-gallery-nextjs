"use client";
import { SearchIcon } from "@/icons/search-icon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.push(search ? `/?search=${search}` : `/`);
  }, [setSearch, search, router]);

  const handlePopup = () => router.push("/?popup=true");

  return (
    <div className="flex items-center justify-between gap-2  w-full max-w-screen-2xl mx-auto px-4">
      <div className="flex items-center my-4 w-full">
        <input
          type="text"
          placeholder="Search images or videos"
          className="border p-2 rounded-lg pr-14 max-w-md w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon className="-ml-8 cursor-pointer active:scale-95" />
      </div>
      <button
        onClick={handlePopup}
        className="font-semibold cursor-pointer bg-cyan-300 px-4 py-2 rounded-lg active:scale-95"
      >
        Upload
      </button>
    </div>
  );
};

export default Search;
