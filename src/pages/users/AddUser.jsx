import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import UsersForm from "./components/UsersForm.jsx";

function AddUser() {
  return (
    <>
      <PageHeader
        title="Добавить пользователя"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Пользователи", link: "/users" },
          { label: "Добавить пользователя" },
        ]}
      />{" "}
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Пользователи", link: `/users` }} />
          <UsersForm />
        </div>
      </div>
    </>
  );
}

export default AddUser;
