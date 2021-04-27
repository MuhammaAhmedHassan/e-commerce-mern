import { v2 as cloudinary } from "cloudinary";

export const removeImagesUtilFunc = async (images: string[]) => {
  for (let i = 0; i < images.length; i++) {
    const imageId = images[i];
    await cloudinary.uploader.destroy(imageId);
  }
};
