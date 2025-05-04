import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import CompanyForm from "./components/CompanyForm.jsx";

function AddCompany() {
  return (
    <>
      <PageHeader
        title="Добавить компанию"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Компании", link: "/company" },
          { label: "Добавить компанию" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Компании", link: `/company` }} />
          <CompanyForm />
        </div>
      </div>
    </>
  );
}

export default AddCompany;
