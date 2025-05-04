const roleColors = {
  1: "text-red-500", // Супер админ
  2: "text-blue-500", // Менеджер
  3: "text-purple-500", // Компания
  4: "text-green-500", // Филиал
  5: "text-yellow-500", // Касса
};

const RenderCell = ({ value, id }) => {
  const isEmpty = value === null || value === undefined || value === "";
  const color = roleColors[id] || "text-main-blackish";

  return (
    <span
      title={value}
      className={`font-medium line-clamp-2 ${
        isEmpty ? "text-gray-400 italic opacity-70" : color
      }`}
    >
      {isEmpty ? "Пустой" : value}
    </span>
  );
};

export default RenderCell;
