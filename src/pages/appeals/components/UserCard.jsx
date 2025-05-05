import { formatDate } from "@/utils/dateFormatter";

function UserCard({ item }) {
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
      <div className="mb-2">
        <p className="text-base text-black font-bold">Murojaat sanasi:</p>
        <p className="text-base font-medium text-gray-800">
          {formatDate(item.created_at)}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-base text-black font-bold">Murojaatchi ismi:</p>
        <p className="text-base font-medium text-gray-800">{item.user_name}</p>
      </div>
      <div>
        <p className="text-base text-black font-bold">Murojaatchi xabari:</p>
        <p className="text-base text-gray-800">{item.message}</p>
      </div>
    </div>
  );
}

export default UserCard;
