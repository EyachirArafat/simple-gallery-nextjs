"use client";

import ImageCard from "@/components/image-card";
import { ICard } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Popup from "./popup";

const PhotoGallery = ({ data }: { data: ICard[] }) => {
  const [createNew, setCreateNew] = useState<ICard[]>([]);

  const items = data;
  const params = useSearchParams();
  const types = params.get("type");
  const search = params.get("search")?.trim();
  const popup = params.get("popup") ? true : false;

  const route = useRouter();
  const handleClose = () => route.push("/");

  useEffect(() => {
    const filteredData = items.filter((item) => {
      if (types === "photos" && item.types !== "photo") return false;
      if (types === "videos" && item.types !== "video") return false;
      if (search && !item.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
    setCreateNew(filteredData);
  }, [types, search, items]);

  const addNewOne = (title: string, file: File, types: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const IVid = items.length.toString();

      const addNew = {
        id: IVid + 1,
        types,
        src: e.target?.result as string,
        title,
        des: "Lorem ipsum dolor sit ame",
        like: 0,
        share: 0,
      };

      setCreateNew((prev) => [...prev, addNew]);
      handleClose();
    };

    reader.readAsDataURL(file);
  };

  const photo = createNew.filter((item) => item.types === "photo");
  const video = createNew.filter((item) => item.types === "video");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-3 ">
      {popup && <Popup submit={addNewOne} handleClose={handleClose} />}
      {createNew.length > 0 ? (
        <>
          {photo.map((item, index) => (
            <ImageCard key={item.id} {...item} index={index} />
          ))}
          {video.map((item, index) => (
            <ImageCard key={item.id} {...item} index={index} />
          ))}
        </>
      ) : (
        <div className="text-center font-semibold text-xl">Data not found</div>
      )}
    </div>
  );
};

export default PhotoGallery;
