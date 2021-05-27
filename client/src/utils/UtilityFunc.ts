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
