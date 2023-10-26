export const truncate = (str: string, maxLength: number) => {
  console.log(str.length > maxLength ? str.slice(0, maxLength - 1) + "…" : str)
  return str.length > maxLength ? str.slice(0, maxLength - 1) + "…" : str;
};
