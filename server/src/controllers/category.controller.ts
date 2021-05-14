import { Request, Response } from "express";
import { ServerError } from "../errors/server-error";
import { DatabaseUniqueValueError } from "../errors/database-unique-value-error";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { DatabaseValidationError } from "../errors/database-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { slugifyStr } from "../utils/slugifyStr";
import { DatabaseError } from "../errors/database-error";

export const listAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({}).lean();
    res.json(categories);
  } catch (error) {
    console.log(
      "listAllCategories ---> Controller",
      JSON.stringify(error, undefined, 2)
    );
    throw new DatabaseError("Something went wrong.");
  }
};

export const listCategoriesPerPage = async (req: Request, res: Response) => {
  const page = +(req.query.page || 1);
  const limit = 10;
  const skip = limit * (page - 1);
  try {
    const cateogries = await Category.aggregate([
      { $match: {} },
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: page } }],
          data: [{ $skip: limit * skip }, { $limit: limit }],
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);

    res.json(cateogries);
  } catch (error) {
    console.log(
      "listCategoriesPerPage ---> Controller",
      JSON.stringify(error, undefined, 2)
    );
    throw new DatabaseError("Something went wrong.");
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = new Category({
      name,
      slug: slugifyStr(`${name}`),
    });

    await category.save();
    res.json(category);
  } catch (error) {
    console.log(
      "createCategory --------> CONTROLLER -->",
      JSON.stringify(error, undefined, 2)
    );
    if (error.name === "MongoError" && error.code === 11000) {
      throw new DatabaseUniqueValueError(error.keyValue);
    }
    if (error.name === "ValidationError") {
      throw new DatabaseValidationError(error.errors.name.properties);
    }
    throw new ServerError();
  }
};

export const readCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  // const category = await Category.aggregate([{ $match: { slug } }]);
  const category = await Category.findOne({ slug }).lean();
  if (!category) throw new BadRequestError("Category not found");

  return res.json(category);
};
export const updateCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { slug } = req.params;

  const category = await Category.findOneAndUpdate(
    { slug },
    { name },
    { new: true }
  );

  if (!category) throw new BadRequestError("Category not found");

  res.json(category);
};
export const deleteCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const category = await Category.findOneAndDelete({ slug }).exec();
  if (!category) throw new BadRequestError("Category not found");

  res.json({ message: "Category deleted successfully" });
};

export const readRelatedProducts = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sort = "createdAt";

  const skip = limit * (page - 1);

  const products = await Product.find({ category: categoryId })
    .skip(skip)
    .limit(limit)
    // .populate('postedBy', '_id name')
    .sort({ [sort]: -1 })
    .lean()
    .exec();

  const totalProducts = await Product.countDocuments({
    category: categoryId,
  })
    .lean()
    .exec();

  const allProducts = { products: products, total: totalProducts, page };

  res.json(allProducts);
};
