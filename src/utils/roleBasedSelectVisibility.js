const roleBasedSelectVisibility = (role) => {
  switch (role) {
    case 1:
      return false; // SUPER_ADMIN uchun filialni tanlash kerak emas
    case 2:
      return true; // MANAGER
    case 3: // COMPANY
    case 4: // BRANCH
      return true; // Bu rollarga filialni tanlash kerak
    case 5: // Cashier
      return true; // Bu rollarga filialni tanlash kerak
    default:
      return false; // Boshqa holatlarda ham filialni tanlash kerak
  }
};
export default roleBasedSelectVisibility;
