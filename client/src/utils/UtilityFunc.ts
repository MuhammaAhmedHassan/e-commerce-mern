export function getCapitalizeStr(str: string) {
  return str[0].toUpperCase() + str.substr(1);
}

export function makeCamelCaseString({
  str,
  charToRemove,
}: {
  str: string;
  charToRemove: string;
}) {
  const strArr = str.split(charToRemove);
  let resultStr = strArr[0];
  for (let i = 1; i < strArr.length; i++) {
    resultStr += getCapitalizeStr(strArr[i]);
  }
  return resultStr;
}

export const toObject = (arr: unknown) => {
  return (arr as [{ _id: string }]).reduce((prv, cur) => {
    prv[cur._id] = cur;
    return prv;
  }, {} as { [_id: string]: unknown });
};

export const makeUrlForShopPage = (options: {
  query: string | string[];
  min: string | string[];
  max: string | string[];
  categoryIds: string | string[];
}) => {
  const { query, min, max, categoryIds } = options;
  let url = "?";
  if (query) url += `query=${query}&`;
  if (min) url += `min=${min}&`;
  if (max) url += `max=${max}&`;
  if (categoryIds?.length) url += `categoryIds=${categoryIds}&`;

  const urlLen = url.length;

  if (url[urlLen - 1] === "&") url = url.substr(0, urlLen - 1);
  if (url[urlLen - 1] === "?") url = "";

  return url;
};
