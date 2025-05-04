import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import CategoryForm from "./components/CategoryForm.jsx";

function AddCategory() {
  return (
    <>
      <PageHeader
        title="Bo'lim qo'shish"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Bo'limlar", link: "/categories" },
          { label: "Bo'lim qo'shish" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Bo'limlar", link: `/categories` }} />
          <CategoryForm />
        </div>
      </div>
    </>
  );
}

export default AddCategory;
