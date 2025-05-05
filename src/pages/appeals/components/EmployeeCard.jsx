import { formatDate } from "@/utils/dateFormatter";
const statusColor = {
  NEW: "bg-blue-100 text-blue-700",
  INPROGRESS: "bg-yellow-100 text-yellow-700",
  POSITIVE: "bg-green-100 text-green-700",
  NEGATIVE: "bg-red-100 text-red-700",
};

const statusText = {
  NEW: "Yangi",
  INPROGRESS: "Jarayonda",
  POSITIVE: "Ijobiy yakunlangan",
  NEGATIVE: "Salbiy yakunlangan",
};
function EmployeeCard({ item }) {
  return (
    <>
      {(item.operator_name || item.operator_message) && (
        <div className="mb-4 p-4 bg-blue-50 rounded-md border border-blue-200">
          <div className="mb-2">
            <p className="text-base text-blue-600 font-bold">
              Javob berilgan vaqt:
            </p>
            <p className="text-base font-medium text-gray-800">
              {formatDate(item.updated_at)}
            </p>
          </div>
          {item.operator_name && (
            <div className="mb-2">
              <p className="text-base text-blue-600 font-bold">
                Javob beruvchi ismi:
              </p>
              <p className="text-base font-medium text-gray-800">
                {item.operator_name}
              </p>
            </div>
          )}
          {item.operator_message && (
            <div>
              <p className="text-base text-blue-600 font-bold">
                Javob beruvchi javobi:
              </p>
              <p className="text-base text-gray-800">{item.operator_message}</p>
            </div>
          )}
          <span
            className={`text-xs px-3 inline-block mt-3 py-1 rounded font-medium ${
              statusColor[item.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {statusText[item.status] || "Nomaʼlum holat"}
          </span>
        </div>
      )}
    </>
  );
}

export default EmployeeCard;
