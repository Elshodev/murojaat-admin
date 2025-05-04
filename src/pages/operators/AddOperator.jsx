import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import OperatorForm from "./components/OperatorForm.jsx";

function AddOperator() {
  return (
    <>
      <PageHeader
        title="Xodim qo'shish"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Xodimlar", link: "/operators" },
          { label: "Xodim qo'shish" },
        ]}
      />{" "}
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Xodimlar", link: `/operators` }} />
          <OperatorForm />
        </div>
      </div>
    </>
  );
}

export default AddOperator;
