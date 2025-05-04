import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import CategoryForm from "./components/CategoryForm.jsx";

function AddCategory() {
  return (
    <>
      <PageHeader
        title="Добавить шаблон категории"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Шаблоны категории", link: "/templateCategories" },
          { label: "Добавить шаблон категории" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink
            links={{ title: "Шаблоны категории", link: `/templateCategories` }}
          />
          <CategoryForm />
        </div>
      </div>
    </>
  );
}

export default AddCategory;
