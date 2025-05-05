import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "react-router-dom";

export default function EmployeeAppeals() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useRequest(
    "/operator/applications?status=INPROGRESS"
  );

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Xodimga biriktirilgan arizalar
      </h2>
      <ul className="space-y-2">
        {data?.data?.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(`/employee/${item.id}`)}
            className="cursor-pointer border p-3 rounded hover:bg-gray-100 transition"
          >
            <p>
              <strong>{item.user_name}:</strong> {item.message}
            </p>
            <p className="text-sm text-gray-500">Status: {item.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
