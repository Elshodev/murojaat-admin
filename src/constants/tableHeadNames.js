export const usersGridHeaderConfig = {
  gridTemplate: "grid-cols-[50px_1fr_1fr_1fr_1fr_2fr]",
  headers: [
    { label: "№", type: "cell" },
    { label: "F.I.O", type: "cell" },
    { label: "Telefon raqami", type: "cell" },
    { label: "Viloyat", type: "cell" },
    { label: "Ro'yhatdan o'tgan sanasi", type: "cell" },
    {
      label: "Arizalar",
      type: "group",
      columns: "grid-cols-4",
      children: [
        { label: "Yuborgan" },
        { label: "Jarayonda" },
        { label: "Javob berilgan" },
        { label: "Jami" },
      ],
    },
  ],
};
export const regionsGridHeaderConfig = {
  gridTemplate: "grid-cols-[50px_1fr_1fr_100px]",
  headers: [
    { label: "№", type: "cell" },
    { label: "Viloyat nomi", type: "cell" },
    { label: "Yaratilgan vaqti", type: "cell" },
    { label: "Harakatlar", type: "cell" },
  ],
};
export const operatorsGridHeaderConfig = {
  gridTemplate: "grid-cols-[50px_1fr_1fr_1fr_1fr_2fr_1fr]",
  headers: [
    { label: "№", type: "cell" },
    { label: "F.I.O", type: "cell" },
    { label: "Telefon raqami", type: "cell" },
    { label: "Viloyat", type: "cell" },
    { label: "Bo'limi", type: "cell" },
    {
      label: "Ko'rilayotgan arizalar",
      type: "group",
      columns: "grid-cols-3",
      children: [
        { label: "Yangi" },
        { label: "Jarayonda" },
        { label: "Javob berilgan" },
      ],
    },
    { label: "Harakatlar", type: "cell" },
  ],
};
export const categoriesGridHeaderConfig = {
  gridTemplate: "grid-cols-[50px_1fr_100px]",
  headers: [
    { label: "№", type: "cell" },
    { label: "Bo'lim nomi", type: "cell" },
    { label: "Harakatlar", type: "cell" },
  ],
};

