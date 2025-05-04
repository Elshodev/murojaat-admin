export const formatPhoneNumber = (number) => {
  if (!number) return "";

  const cleaned = number.replace(/\D/g, "");

  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
  } else if (cleaned.length === 12) {
    return cleaned.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 ($2) $3-$4-$5"
    );
  }

  return number;
};
