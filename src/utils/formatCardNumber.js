export const formatCardNumber = (number) => {
  return number.match(/.{1,4}/g).join(" ");
};
