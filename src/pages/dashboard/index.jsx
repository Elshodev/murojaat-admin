import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import StatisticCard from "../../components/Cards/StatisticCard.jsx";
import { useRequest } from "../../hooks/useRequest.js";
import PageLoader from "../../components/loader/PageLoader.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import { useUserStore } from "@/store/userStore.js";

function Dashboard() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useUserStore();
  let roleId = user?.role?.roleId;

  const endpoints = [
    {
      key: "users?page=1&size=20",
      title: "Пользователи",
      link: "/users",
      allowedLink: [1, 2, 3],
    },
    {
      key: "regions?page=1&size=20",
      title: "Регионы",
      link: "/regions",
      allowedLink: [1],
    },
    {
      key: "branches?page=1&size=20",
      title: "Филиалы",
      link: "/branches",
      allowedLink: [1, 3],
    },
    {
      key: "company?page=1&size=20",
      title: "Компании",
      link: "/company",
      allowedLink: [1],
    },
    {
      key: "terminal?page=1&size=20",
      title: "Терминалы",
      link: "/terminal",
      allowedLink: [1, 2, 3, 6],
    },
    {
      key: "products/template?page=1&size=20",
      title: "Шаблонные продукты",
      link: "/templateProducts",
      allowedLink: [1],
    },
    {
      key: "products/template/category?page=1&size=20",
      title: "Шаблоны категории",
      link: "/templateCategories",
      allowedLink: [1],
    },
    {
      key: "products?page=1&size=20",
      title: "Продукты",
      link: "/products",
      allowedLink: [2, 3, 5],
    },
    {
      key: "products/category",
      title: "Категории",
      link: "/categories",
      allowedLink: [2, 3, 5],
    },
  ];

  const requests = endpoints
    .filter(({ allowedLink }) => allowedLink?.includes(roleId)) // Faqat allowedLink mavjud va roleId ichida bo‘lsa
    .map(({ key }) => ({
      key,
      ...useRequest(`/${key}`),
    }));

  const isLoading = requests.some(({ isLoading }) => isLoading);
  const data = Object.fromEntries(requests.map(({ key, data }) => [key, data]));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    setIsRefreshing(false);
  };

  if (isLoading || isRefreshing) return <PageLoader />;

  return (
    <>
      <PageHeader
        title="Bosh sahifa"
        breadcrumbs={[{ label: "Admin", link: "/" }, { label: "Bosh sahifa" }]}
      />
      <div className="px-[30px] py-5">
        <div className="bg-white p-[34px] pb-[50px]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Статистика</h2>
            <UniversalBtn onClick={handleRefresh} isLoading={isRefreshing}>
              Yangilash
            </UniversalBtn>
          </div>
          <div className="mt-[27px] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[20px]">
            {endpoints
              .filter(({ allowedLink }) => allowedLink?.includes(roleId))
              .map(({ key, title, link }) => (
                <StatisticCard
                  key={key}
                  link={link}
                  title={title}
                  value={data[key]?.totalItems ?? data[key]?.data?.length ?? 0}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
