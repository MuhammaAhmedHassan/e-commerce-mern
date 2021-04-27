export const printMessage = (label: string, obj: unknown) => {
  console.group(label);
  console.log(obj);
  console.log(label, JSON.stringify(obj, undefined, 2));
  console.groupEnd();
};
