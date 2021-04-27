import mongoose from "mongoose";
import slugify from "slugify";

// interface for categories attributes
interface SubCategoryAttrs {
  name: string;
  slug: string;
}

// interface that describes additional
// properties Category Model has
interface SubCategoryModel extends mongoose.Model<SubCategoryDoc> {}

// interface that describes properties
// Category Document has
interface SubCategoryDoc extends mongoose.Document {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  createdAt: string;
  updatedAt: string;
}

const subCategorySchema = new mongoose.Schema(
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
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Parent category is required"],
    },
  },
  { timestamps: true, versionKey: false }
);

// I think this is not working
subCategorySchema.pre("save", async function (done) {
  console.log("Pre Save");
  if (this.isModified("name")) {
    const slug = slugify(this.get("name"), { lower: true, replacement: "-" });
    this.set("slug", slug);
  }

  done();
});

export const SubCategory = mongoose.model<SubCategoryDoc, SubCategoryModel>(
  "SubCategory",
  subCategorySchema
);
