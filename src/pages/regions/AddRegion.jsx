import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import RegionForm from "./components/RegionForm.jsx";

function AddRegion() {
  return (
    <>
      <PageHeader
        title="Добавить регион"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Регионы", link: "/regions" },
          { label: "Добавить регион" },
        ]}
      />
      <div className="mx-auto px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Регионы", link: `/regions` }} />
          <RegionForm />
        </div>
      </div>
    </>
  );
}

export default AddRegion;
