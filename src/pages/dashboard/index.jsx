import StatisticCard from "../../components/Cards/StatisticCard.jsx";
import { useRequest } from "../../hooks/useRequest.js";
import PageLoader from "../../components/loader/PageLoader.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";

function Dashboard() {
  const {
    data: statistics,
    isLoading,
    error,
  } = useRequest(`/operator/statistics`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Bosh sahifa"
        breadcrumbs={[{ label: "Admin", link: "/" }, { label: "Bosh sahifa" }]}
      />
      <div className="px-[30px] py-5">
        <div className="bg-white p-[34px] pb-[50px]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Statistikalar</h2>
          </div>
          <div className="mt-[27px] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[20px]">
            {statistics.map((item) => (
              <StatisticCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
