import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import { v4 } from "uuid";
import { BadRequestError } from "../errors/bad-request-error";

export const uploadImages = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { images } = req.body;
  const imagesInfo: { imageId: string; url: string }[] = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      public_id: v4(),
      // type: "auto",
    });

    console.log("Find the filename of the uploaded product ----- >", result);
    imagesInfo.push({ imageId: result.public_id, url: result.secure_url });
  }

  req.body.images = imagesInfo;

  next();
};

export const updateProductRemoveImages = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { removedImages } = req.body || [];

  for (let i = 0; i < removedImages.length; i++) {
    const imageId = removedImages[i];
    await cloudinary.uploader.destroy(imageId);
  }

  next();
};
