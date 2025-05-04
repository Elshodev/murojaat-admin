import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import BranchForm from "./components/BranchForm.jsx";

function AddBranch() {
  return (
    <>
      <PageHeader
        title="Добавить филиал"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Филиалы", link: "/branches" },
          { label: "Добавить филиал" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Филиалы", link: `/branches` }} />
          <BranchForm />
        </div>
      </div>
    </>
  );
}

export default AddBranch;
