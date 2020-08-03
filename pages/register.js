import FormSign from "../components/FormSign";
import { useRegister } from "../hooks/useRegister";

export default function Register() {
  const [isLoading, errorMsg, register] = useRegister();

  return (
    <FormSign
      title="Sign Up"
      btnText="Register"
      isLoading={isLoading}
      onSubmit={register}
      errorMsg={errorMsg}
      isRegister
    />
  );
}
