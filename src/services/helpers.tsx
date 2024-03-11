/* eslint-disable prettier/prettier */
export const reduceText = (text: string) => {
  let data = text;
  return data.length >= 25 ? `${data.slice(0, 15)} ...` : data;
};
