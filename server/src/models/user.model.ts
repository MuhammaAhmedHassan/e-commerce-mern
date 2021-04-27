import mongoose from "mongoose";
const { Schema, model } = mongoose;

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  name?: string;
  email: string;
  picture?: string;
  role?: "subscriber" | "admin";
  cart?: [];
  address?: string;
}

// An interface that describes the properties
// that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describe the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  name?: string;
  email: string;
  role: "subscriber" | "admin";
  cart?: [];
  address?: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["subscriber", "admin"],
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    picture: String,
    // wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = model<UserDoc, UserModel>("User", userSchema);
