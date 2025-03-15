"use client";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useEffect, useState } from "react";

type Props = {
  submit: (title: string, file: File, types: string) => void;
  handleClose: () => void;
};
const Popup: FC<Props> = ({ submit, handleClose }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [types, setTypes] = useState("photo");

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      alert("Please enter a title and select a file.");
      return;
    }
    if (title && file && types) {
      submit(title, file, types);
      alert(`${types === "photo" ? "Photo" : "Video"} uploaded successfully`);
    }

    setTitle("");
    setFile(null);
    setTypes("photo");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-100">
      <div className="sm:w-[40%] md:w-[50%] w-[85%] bg-gray-200 absolute  left-1/2 top-1/3 -translate-x-1/2  z-50  pb-4">
        <div className="flex flex-col h-full overflow-y-auto overflow-hidden">
          <div className="flex justify-between items-center px-2 pb-3">
            <h2 className=" px-3 py-1.5 mt-1.5 font-semibold">
              Add to your collection
            </h2>
            <button
              onClick={handleClose}
              className=" rounded-full text-white hover:text-red-600 bg-red-700/30 flex justify-center items-center w-6 h-6 hover:scale-110 cursor-pointer active:scale-95 active:border border-red-600"
            >
              X
            </button>
          </div>
          <div className="overflow-y-auto">
            <form
              onSubmit={handleUpload}
              className="flex flex-col gap-4 px-3 w-full"
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2"
                placeholder="Title"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files![0])}
                className="border p-2"
              />
              <select
                name="types"
                onChange={(e) => setTypes(e.target.value)}
                className="border p-2"
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
              <button
                className="px-2 w-fit flex justify-end cursor-pointer bg-cyan-300 py-0.5 rounded-lg active:scale-95 ml-auto"
                type="submit"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
