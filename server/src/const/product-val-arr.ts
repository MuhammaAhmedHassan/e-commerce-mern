import { body, param, checkSchema, check } from "express-validator";

export const createOrUpdateProductValArr = [
  body("title").trim().notEmpty().withMessage("Product title is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),
  body("price").isDecimal().withMessage("Product price is required"),
  body("category").isMongoId().withMessage("Category id is required"),
  body("subCategories")
    .isArray()
    .isMongoId()
    .withMessage("Sub category id is required"), // check this
  body("quantity").isNumeric().withMessage("Quantity must be a numeric value"),
  body("images").isArray().withMessage("Images must be an array field"),
  body("shipping")
    .notEmpty()
    .custom((shipping: string) => {
      const expectedValues = ["Yes", "No"];
      return expectedValues.some((e) => e === shipping);
    })
    .withMessage("Shipping value can either be 'Yes' or 'No'"),
  body("color")
    .notEmpty()
    .custom((color) => {
      const expectedColors = ["Black", "Brown", "Silver", "White", "Blue"];
      return expectedColors.some((c) => c === color);
    }),

  body("brand")
    .notEmpty()
    .custom((brand) => {
      const expectedBrands = [
        "Apple",
        "Samsung",
        "Microsoft",
        "Lenovo",
        "ASUS",
      ];
      return expectedBrands.some((b) => b === brand);
    }),

  // check('ratings').isArray().withMessage('Ratings must be an array value'),
  // check("ratings.*.star")
  //   .isNumeric()
  //   .withMessage("Rating's star value must be numeric"),
  // check("ratings.*.postedBy")
  //   .isMongoId()
  //   .withMessage("Rating's postedBy value must be a numeric value"),
];

export const updateProductValArr = [
  body("images").isArray().withMessage("'images' must be an array field"),
  body("removedImages")
    .isArray()
    .withMessage("'removedImages' must be an array field"),
];

export const catParamCheckArr = [
  param("slug").exists().withMessage("Query parameter 'slug' must be provided"),
];

export const productIdParamCheckArr = [
  param("id").exists().withMessage("Query parameter 'id' must be provided"),
];

// checkSchema({
//   shipping: {
//     in: "body",
//     matches: {
//       options: [/\b(?=Yes|No)\b/],
//       errorMessage: "Shipping value can either 'Yes' or 'No'",
//     },
//   },
// }),
// checkSchema({
//   color: {
//     in: "body",
//     matches: {
//       options: [/^(?=Black|Brown|Silver|White|Blue)$/],
//       errorMessage:
//         "Color value can only be one of Black, Brown, Silver, White, Blue",
//     },
//   },
// }),
// checkSchema({
//   brand: {
//     in: "body",
//     matches: {
//       options: [/^(?=Apple|Samsung|Microsoft|Lenovo|ASUS)$/],
//       errorMessage:
//         "Brand value can only be one of Apple, Samsung, Microsoft, Lenovo, ASUS",
//     },
//   },
// }),
