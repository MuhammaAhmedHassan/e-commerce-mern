import mongoose from "mongoose";
import slugify from "slugify";
import { SubCategory } from "./sub-category.model";

// interface for categories attributes
interface CategoryAttrs {
  name: string;
  slug: string;
}

// interface that describes additional
// properties Category Model has
interface CategoryModel extends mongoose.Model<CategoryDoc> {}

// interface that describes properties
// Category Document has
interface CategoryDoc extends mongoose.Document {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Category name is required",
      minlength: [2, "Too short category name"],
      maxLength: [32, "To long category name"],
    },
    slug: {
      type: String,
      unique: true,
      required: "Slug value is required",
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// I think this is not working
categorySchema.pre("save", async function (done) {
  console.log("Pre Save");
  if (this.isModified("name")) {
    const slug = slugify(this.get("name"), { lower: true, replacement: "-" });
    this.set("slug", slug);
  }

  done();
});

categorySchema.pre("remove", async function (next) {
  // 'this' is the client being removed.
  await SubCategory.remove({ parentCategory: this._id }).exec();
  next();
});

export const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "Category",
  categorySchema
);
