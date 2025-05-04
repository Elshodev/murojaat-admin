import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import RegionForm from "./components/RegionForm.jsx";

function AddRegion() {
  return (
    <>
      <PageHeader
        title="Viloyat qo'shish"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Viloyatlar", link: "/regions" },
          { label: "Viloyat qo'shish" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Viloyatlar", link: `/regions` }} />
          <RegionForm />
        </div>
      </div>
    </>
  );
}

export default AddRegion;
