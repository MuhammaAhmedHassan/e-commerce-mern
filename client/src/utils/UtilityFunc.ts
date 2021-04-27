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
