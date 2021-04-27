import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { uuid } from "uuidv4";

// for form data => req.files.file.path
export const uploadImages = async (req: Request, res: Response) => {
  // this is a json data
  const result = await cloudinary.uploader.upload(req.body.images, {
    public_id: uuid(),
    type: "auto",
  });

  res.json({
    imageId: result.public_id,
    url: result.secure_url,
  });
};

export const removeImage = async (req: Request, res: Response) => {
  const imageId = req.body.imageId;
  await cloudinary.uploader.destroy(imageId);
  res.json({ message: "Image deleted successfully" });
};
