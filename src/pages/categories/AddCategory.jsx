import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import CategoryForm from "./components/CategoryForm.jsx";

function AddCategory() {
  return (
    <>
      <PageHeader
        title="Добавить категорию"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Категории", link: "/categories" },
          { label: "Добавить категорию" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Категории", link: `/categories` }} />
          <CategoryForm />
        </div>
      </div>
    </>
  );
}

export default AddCategory;
