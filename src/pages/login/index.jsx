import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleChange } from "../../utils/auth.js";
import CustomInput from "../../components/formElements/CustomInput.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { logo } from "@/assets/index.js";
import NoConnection from "@/components/noConnection/NoConnection.jsx";
import { Eye, EyeOff } from "lucide-react";
function Login() {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  if (isError) {
    if (isError.message == "Network Error") {
      return <NoConnection />;
    }
  }
  return (
    <div
      id="login"
      className="flex items-center justify-center h-screen bg-[#E9ECEF]"
    >
      <div className="flex flex-col items-center bg-white p-6 rounded">
        <img className="max-w-[110px] mb-2" src={logo} alt="" />
        <h1 className="text-[26px] font-bold mb-4 text-center text-[#4c4d4d]">
          Tizimga kirish
        </h1>
        <form
          onSubmit={(e) =>
            handleLogin(e, formData, navigate, setIsLoading, setIsError)
          }
          className="min-w-[500px]"
        >
          <CustomInput
            label={"Tizimga kirish"}
            onChange={(e) => handleChange(e, setFormData)}
            className="bg-white"
            placeholder="Tizimga kirish"
            name={"login"}
            divClass="!px-0"
            autoComplete="username"
            value={formData?.login || ""}
          />
          <CustomInput
            label={"Parol"}
            onChange={(e) => handleChange(e, setFormData)}
            className="bg-white"
            type={showPassword ? "text" : "password"}
            placeholder="Parol"
            name={"password"}
            divClass="mt-4 !px-0"
            value={formData?.password || ""}
            onClick={() => setShowPassword(!showPassword)}
            Icon={
              showPassword ? (
                <Eye className="w-5" />
              ) : (
                <EyeOff className="w-5" />
              )
            }
          />
          <UniversalBtn
            type="submit"
            loading={isLoading}
            className="w-full justify-center mt-4"
          >
            Войти
          </UniversalBtn>
        </form>
        <h2 className="mt-4 text-main-blackish font-semibold">
          IIV JXD YHXX ATRB Dasturiy ta'minot markazi
        </h2>
      </div>
    </div>
  );
}

export default Login;
