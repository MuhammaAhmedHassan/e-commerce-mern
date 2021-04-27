import { Request, Response } from "express";
import { Product, ProductDoc } from "../models/product.model";
import { User } from "../models/user.model";
import slugify from "slugify";
import { BadRequestError } from "../errors/bad-request-error";
import { removeImagesUtilFunc } from "../utils/cloudinary.utils";

export const createProduct = async (req: Request, res: Response) => {
  console.log("product.controller.ts => createProduct()", req.body);
  // const { images, ...rest} = req.body
  const productAttrs = {
    ...req.body,
    slug: slugify(req.body.title),
  };

  const newProduct = await new Product(productAttrs).save();

  res.json(newProduct);
};

export const readProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sort = req.query.sort as string;

  if (isNaN(page) || isNaN(limit) || sort.length < 1) {
    throw new BadRequestError(
      "Query params page, limit, and sort are required"
    );
  }

  const skip = limit * (page - 1);

  // const products = await Product.aggregate([
  //   {
  //     $facet: {
  //       metadata: [{ $count: "totalProducts" }, { $addFields: { page } }],
  //       data: [
  //         { $skip: limit * skip },
  //         { $limit: limit },
  //         {
  //           $lookup: {
  //             from: "categories",
  //             localField: "category",
  //             foreignField: "_id",
  //             as: "category",
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "subcategories",
  //             localField: "subCategories",
  //             foreignField: "_id",
  //             as: "subCategories",
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   { $sort: { updatedAt: -1 } },
  // ]);

  const products =
    sort === "createdAt"
      ? await Product.find({})
          .skip(skip)
          .limit(limit)
          .populate("subCategories")
          .populate("category")
          .sort({ createdAt: -1 })
          .lean()
          .exec()
      : await Product.find({})
          .sort({ [sort]: -1, _id: 1 })
          .skip(skip)
          .limit(limit)
          .populate("subCategories")
          .populate("category")
          .lean()
          .exec();

  // const totalProducts = await Product.countDocuments().exec();
  const totalProducts = await Product.estimatedDocumentCount().exec();
  const allProducts = { data: products, total: totalProducts, page };

  res.json(allProducts);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const _id = req.params.id;

  const product = await Product.findById({ _id }).exec();

  if (!product) throw new BadRequestError("Product not found");

  const imagesToRemove = product.images.map((i) => i.imageId);

  await removeImagesUtilFunc(imagesToRemove);

  await Product.remove({ _id }).exec();

  res.status(204).json({ message: "Product deleted successfully" });
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  let { removedImages, images: newImages, ...rest } = req.body;
  const product = await Product.findById(productId).exec();

  if (!product) throw new BadRequestError("Product not found");

  removedImages = removedImages.reduce((prv: any, cur: any) => {
    prv[cur] = cur;
    return prv;
  }, {});

  let images: {
    imageId: string;
    url: string;
  }[] = product.images.filter((img) => {
    if (removedImages[img.imageId] === img.imageId) return false;
    else return true;
  });

  images = images.concat(newImages);

  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { ...rest, images },
    { new: true }
  ).exec();

  res.status(204).json(updatedProduct);
};

export const updatedProductRating = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const star = req.body.star;
  const product = await Product.findById(productId).lean().exec();

  if (!product) throw new BadRequestError("Product not found");

  const user = await User.findOne({ email: req.user.email }).exec();

  const existingRatingObject = product.ratings.find(
    (elem) => elem.postedBy.toString() === user?._id.toString()
  );

  let updatedProduct: ProductDoc | null;
  if (existingRatingObject === undefined) {
    updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { ratings: { star, postedBy: user?._id } },
      },
      { new: true }
    ).exec();
  }

  await Product.findByIdAndUpdate(
    productId,
    {
      $set: { "ratings.$.star": star },
      $setOnInsert: {
        "ratings.$.star": star,
        "ratings.$.postedBy": user?._id,
      },
    },
    {
      upsert: true,
      arrayFilters: [
        {
          "ratings.postedBy": user?._id,
        },
      ],
    }
  ).exec();
};

// export const testBestSelles = async (req: Request, res: Response) => {
//   let { page: p, limit: l, sort } = req.params;

//   const page = parseInt(p);
//   const limit = parseInt(l);

//   console.log("page", page);
//   console.log("limit", limit);
//   console.log("sort", sort);

//   if (isNaN(page) || isNaN(limit) || sort.length < 1) {
//     throw new BadRequestError("Params page, limit, and sort are required");
//   }

//   const skip = limit * (page - 1);
//   console.log("skip", skip);

//   const products = await Product.aggregate([
//     {
//       $facet: {
//         metadata: [{ $count: "totalProducts" }, { $addFields: { page } }],
//         data: [
//           { $sort: { sold: -1, _id: 1 } },
//           { $skip: skip },
//           { $limit: limit },
//           {
//             $lookup: {
//               from: "categories",
//               localField: "category",
//               foreignField: "_id",
//               as: "category",
//             },
//           },
//         ],
//       },
//     },
//   ]);

//   const totalProducts = await Product.countDocuments().exec();

//   const productsData = { data: products, total: totalProducts, page };

//   res.json(productsData);
// };
