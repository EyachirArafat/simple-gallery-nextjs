import { ICard } from "@/types";
import Image from "next/image";
import { FC } from "react";

const ImageCard: FC<ICard> = (props) => {
  const { src, title, des, like, share, index, types } = props;

  return (
    <figure className="relative group w-full overflow-hidden mx-auto ">
      {types === "video" ? (
        <iframe
          width="380"
          height="340"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full object-cover"
        ></iframe>
      ) : (
        <Image
          alt={title}
          src={src}
          width={380}
          height={340}
          className="w-full h-full object-cover"
          priority
        />
      )}

      <div className="absolute font-bold border rounded-lg text-gray-200 text-[12px] px-1 top-2 right-2 p-0.5 z-50">
        {types === "video" ? "Video" : "Photo"} no: {index}
      </div>
      <figcaption className="absolute bg-slate-200/40 bottom-0 left-0 w-full invisible group-hover:visible transition-all duration-200 p-2 cursor-pointer h-0 group-hover:h-24 overflow-hidden text-white px-4">
        <h1 className="font-semibold ">{title}</h1>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis ">
          {des}
        </p>
        <div className="flex justify-between">
          <div className="flex justify-between gap-2">
            <p>Like: {like}</p>
            <p>Share: {share}</p>
          </div>
          <p
            className={`cursor-pointer border py-0.5 px-1.5 rounded-lg active:scale-95 
            }`}
          >
            Favorite
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export default ImageCard;
