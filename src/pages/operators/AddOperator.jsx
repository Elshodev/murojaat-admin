import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import UsersForm from "./components/UsersForm.jsx";

function AddOperator() {
  return (
    <>
      <PageHeader
        title="Foydalanuvchi qo'shish"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Foydalanuvchilar", link: "/users" },
          { label: "Foydalanuvchi qo'shish" },
        ]}
      />{" "}
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Foydalanuvchilar", link: `/users` }} />
          <UsersForm />
        </div>
      </div>
    </>
  );
}

export default AddOperator;
