import mongoose from "mongoose";

interface ProductAttrs {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  subCategories: string[];
  quantity: number;
  sold: number;
  images: string[];
  shipping: "Yes" | "No";
  color: "Black" | "Brown" | "Silver" | "White" | "Blue";
  brand: "Apple" | "Samsung" | "Microsoft" | "Lenovo" | "ASUS";
  ratings: {
    star: number;
    postedBy: string;
  }[];
}

interface ProductModel extends mongoose.Model<ProductDoc> {}

export interface ProductDoc extends mongoose.Document {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  subCategories: string[];
  quantity: number;
  sold: number;
  images: {
    imageId: string;
    url: string;
  }[];
  shipping: "Yes" | "No";
  color: "Black" | "Brown" | "Silver" | "White" | "Blue";
  brand: "Apple" | "Samsung" | "Microsoft" | "Lenovo" | "ASUS";
  ratings: {
    star: number;
    postedBy: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true, // for searching purpose
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    subCategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    },
    ratings: {
      type: [
        {
          star: Number,
          postedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

export const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);
