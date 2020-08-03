import { useState } from "react";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";

import { auth } from "../firebase/clientApp";

export const useRegister = () => {
  const router = useRouter();
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const register = (email, pwd) => {
    setIsLoading(true);

    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then(() => {
        addToast("Successfully registering an account", {
          appearance: "success",
          autoDismiss: true
        });
        setTimeout(() => router.push("/"), 2500);
      })
      .catch(error => {
        setErrorMsg(error.message);
        setIsLoading(false);
      });
  };

  return [isLoading, errorMsg, register];
};
