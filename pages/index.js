import FormSign from "../components/FormSign";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [isLoading, errorMsg, login] = useLogin();

  return (
    <FormSign
      title="Login"
      btnText="Login"
      isLoading={isLoading}
      onSubmit={login}
      errorMsg={errorMsg}
      isRegister={false}
    />
  );
}
