import { useState } from "react";
import { useRouter } from "next/router";

import { auth } from "../firebase/clientApp";

export const useRegister = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const register = (email, pwd) => {
    setIsLoading(true);

    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then(() => {
        router.push("/");
      })
      .catch(error => {
        setErrorMsg(error.message);
        setIsLoading(false);
      });
  };

  return [isLoading, errorMsg, register];
};
