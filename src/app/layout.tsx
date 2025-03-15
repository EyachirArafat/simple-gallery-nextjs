import Navbar from "@/components/navbar";
import Search from "@/components/search";
import { IChildren } from "@/types";
import "./globals.css";

const PhotoLayout = ({ children }: IChildren) => {
  return (
    <html>
      <body>
        <div className="flex flex-col h-screen overflow-hidden">
          <Navbar />
          <Search />
          <div className="overflow-y-auto max-w-screen-2xl w-full mx-auto pt-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default PhotoLayout;
