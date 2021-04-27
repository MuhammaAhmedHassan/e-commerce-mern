import { Request, Response } from "express";
import { ServerError } from "../errors/server-error";
import { DatabaseUniqueValueError } from "../errors/database-unique-value-error";
import { SubCategory } from "../models/sub-category.model";
import { DatabaseValidationError } from "../errors/database-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { slugifyStr } from "../utils/slugifyStr";
import { DatabaseError } from "../errors/database-error";

export const listAllSubCategories = async (req: Request, res: Response) => {
  try {
    const categories = await SubCategory.find({}).lean();
    res.json(categories);
  } catch (error) {
    console.log(
      "listAllCategories ---> Controller",
      JSON.stringify(error, undefined, 2)
    );
    throw new DatabaseError("Something went wrong.");
  }
};

export const listSubCategoriesPerPage = async (req: Request, res: Response) => {
  const page = +(req.query.page || 1);
  const limit = 10;
  const skip = limit * (page - 1);
  try {
    const cateogries = await SubCategory.aggregate([
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

// Create =>
export const createSubCategory = async (req: Request, res: Response) => {
  const { parentCategory } = req.params;
  const { name } = req.body;

  try {
    const subCategory = new SubCategory({
      name,
      slug: slugifyStr(`${name}`),
      parentCategory,
    });

    await subCategory.save();

    res.json(subCategory);
  } catch (error) {
    console.log(
      "create Sub Category --------> CONTROLLER -->",
      JSON.stringify(error.errors, undefined, 2)
    );

    if (error?.errors?.parentCategory) {
      throw new BadRequestError("Parent Category doesn't exists");
    }
    if (error.name === "MongoError" && error.code === 11000) {
      throw new DatabaseUniqueValueError(error.keyValue);
    }
    if (error.name === "ValidationError") {
      throw new DatabaseValidationError(error.errors.name.properties);
    }
    throw new ServerError();
  }
};

// Read
export const readSubCategory = async (req: Request, res: Response) => {
  const { parentCategory, slug } = req.params;
  // const category = await Category.aggregate([{ $match: { slug } }]);
  const subCategory = await SubCategory.findOne({ slug }).lean();
  if (!subCategory) throw new BadRequestError("Sub Category not found");

  return res.json(subCategory);
};

// Update
export const updateSubCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { parentCategory, slug } = req.params;

  const category = await SubCategory.findOneAndUpdate(
    { slug },
    { name, slug: slugifyStr(`${name}`) },
    { new: true }
  );

  if (!category) throw new BadRequestError("Sub category not found");

  res.json(category);
};

// Delete
export const deleteSubCategory = async (req: Request, res: Response) => {
  const { parentCategory, slug } = req.params;
  console.log("slug", slug);

  const category = await SubCategory.findOneAndDelete({ slug }).exec();

  if (!category) throw new BadRequestError("Sub Category not found");

  res.json({ message: "Category deleted successfully" });
};
