import PhotoGallery from "@/components";
import fetchData from "@/data/data";

const PhotoGalleryPage = async () => {
  const data = await fetchData();
  return <PhotoGallery data={data} />;
};

export default PhotoGalleryPage;
