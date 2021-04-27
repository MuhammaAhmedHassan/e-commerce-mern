import slugify from "slugify";

export const slugifyStr = (str: string) => {
  return slugify(str, { lower: true, replacement: "-" });
};
